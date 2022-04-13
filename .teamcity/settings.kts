import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.vcs.GitVcsRoot
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.dockerCommand
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.vcs
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.schedule
import jetbrains.buildServer.configs.kotlin.v2019_2.triggers.ScheduleTrigger
/*
The settings script is an entry point for defining a TeamCity
project hierarchy. The script should contain a single call to the
project() function with a Project instance or an init function as
an argument.
VcsRoots, BuildTypes, Templates, and subprojects can be
registered inside the project using the vcsRoot(), buildType(),
template(), and subProject() methods respectively.
To debug settings scripts in command-line, run the
    mvnDebug org.jetbrains.teamcity:teamcity-configs-maven-plugin:generate
command and attach your debugger to the port 8000.
To debug in IntelliJ Idea, open the 'Maven Projects' tool window (View
-> Tool Windows -> Maven Projects), find the generate task node
(Plugins -> teamcity-configs -> teamcity-configs:generate), the
'Debug' option is available in the context menu for the task.
*/

version = "2020.2"

project {
    vcsRoot(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerRelease)
    vcsRoot(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerDynamic)
    vcsRoot(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerPerformance)
    vcsRoot(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerProduction)
    buildType(Build_Production)
    buildType(Build_Performance)
    buildType(Build_Release)
    buildType(Build_Dynamic)
    buildType(CleanUpWeekly)
}

object Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerRelease : GitVcsRoot({
    name = "https://github.com/DTS-STN/scrum-poker-server/tree/_release"
    url = "git@github.com:DTS-STN/scrum-poker-server.git"
    branch = "refs/heads/main"
    branchSpec = "+:refs/heads/main"
    authMethod = uploadedKey {
        userName = "git"
        uploadedKey = "dtsrobot"
    }
})

object Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerDynamic : GitVcsRoot({
    name = "https://github.com/DTS-STN/scrum-poker-server/tree/_dynamic"
    url = "git@github.com:DTS-STN/scrum-poker-server.git"
    branch = "refs/heads/main"
    branchSpec = "+:refs/heads/*"
    authMethod = uploadedKey {
        userName = "git"
        uploadedKey = "dtsrobot"
    }
})

object Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerPerformance : GitVcsRoot({
    name = "https://github.com/DTS-STN/scrum-poker-server/tree/_performance"
    url = "git@github.com:DTS-STN/scrum-poker-server.git"
    branch = "refs/heads/main"
    branchSpec = "+:refs/heads/main"
    authMethod = uploadedKey {
        userName = "git"
        uploadedKey = "dtsrobot"
    }
})

object Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerProduction : GitVcsRoot({
    name = "https://github.com/DTS-STN/scrum-poker-server/tree/_production"
    url = "git@github.com:DTS-STN/scrum-poker-server.git"
    useTagsAsBranches = true
    branch = "refs/heads/main"
    branchSpec = """
                    +:refs/tags/*
                """.trimIndent()
    authMethod = uploadedKey {
        userName = "git"
        uploadedKey = "dtsrobot"
    }
})

/* Try and keep env.PROJECT value will be used throughout the helm scripts                 */
/* to build urls, name the application and many other things.  folders and files in the    */
/* helmfile directory should also match this value.                                        */
object Build_Release: BuildType({
    name = "Build_Release"
    description = "Continuous integration"
    params {
        param("teamcity.vcsTrigger.runBuildInNewEmptyBranch", "true")
        param("env.PROJECT", "scrum-poker-server")
        param("env.BASE_DOMAIN","bdm-dev.dts-stn.com")
        param("env.SUBSCRIPTION", "%vault:dts-sre/data/azure!/decd-dev-subscription-id%")
        param("env.K8S_CLUSTER_NAME", "ESdCDPSBDMK8SDev-K8S")
        param("env.RG_DEV", "ESdCDPSBDMK8SDev")
        param("env.TARGET", "main")
        param("env.BRANCH", "main")
    }
    vcs {
        root(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerRelease)
    }
   
    steps {
        dockerCommand {
            name = "Build & Tag Docker Image"
            commandType = build {
                source = file {
                    path = "Dockerfile"
                }
                namesAndTags = "%env.ACR_DOMAIN%/%env.PROJECT%:%env.DOCKER_TAG%"
                commandArgs = "--pull --build-arg TC_BUILD=%build.number%"
            }
        }
        script {
            name = "Login to Azure and ACR"
            scriptContent = """
                az login --service-principal -u %TEAMCITY_USER% -p %TEAMCITY_PASS% --tenant %env.TENANT-ID%
                az account set -s %env.SUBSCRIPTION%
                az acr login -n MTSContainers
            """.trimIndent()
        }
        dockerCommand {
            name = "Push Image to ACR"
            commandType = push {
                namesAndTags = "%env.ACR_DOMAIN%/%env.PROJECT%:%env.DOCKER_TAG%"
            }
        }
        script {
            name = "Deploy w/ Helmfile"
            scriptContent = """
                cd ./helmfile
                az account set -s %env.SUBSCRIPTION%
                az aks get-credentials --overwrite-existing --admin --resource-group %env.RG_DEV% --name %env.K8S_CLUSTER_NAME%
                helmfile -e %env.TARGET% apply
            """.trimIndent()
        }
    }
    triggers {
        vcs {
            branchFilter = "+:*"
        }
    }
})

object Build_Dynamic: BuildType({
    name = "Build_Dynamic"
    description = "Dynamic branching; builds and deploys every branch"
    paused = true
    params {
        param("teamcity.vcsTrigger.runBuildInNewEmptyBranch", "true")
        param("env.PROJECT", "scrum-poker-server")
        param("env.BASE_DOMAIN","bdm-dev.dts-stn.com")
        param("env.SUBSCRIPTION", "%vault:dts-sre/data/azure!/decd-dev-subscription-id%")
        param("env.K8S_CLUSTER_NAME", "ESdCDPSBDMK8SDev-K8S")
        param("env.RG_DEV", "ESdCDPSBDMK8SDev")
        param("env.TARGET", "main")
        param("env.BRANCH", "dyna-%teamcity.build.branch%")
    }
    vcs {
        root(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerDynamic)
    }
   
    steps {
        dockerCommand {
            name = "Build & Tag Docker Image"
            commandType = build {
                source = file {
                    path = "Dockerfile"
                }
                namesAndTags = "%env.ACR_DOMAIN%/%env.PROJECT%:%env.DOCKER_TAG%"
                commandArgs = "--pull --build-arg TC_BUILD=%build.number%"
            }
        }
        script {
            name = "Login to Azure and ACR"
            scriptContent = """
                az login --service-principal -u %TEAMCITY_USER% -p %TEAMCITY_PASS% --tenant %env.TENANT-ID%
                az account set -s %env.SUBSCRIPTION%
                az acr login -n MTSContainers
            """.trimIndent()
        }
        dockerCommand {
            name = "Push Image to ACR"
            commandType = push {
                namesAndTags = "%env.ACR_DOMAIN%/%env.PROJECT%:%env.DOCKER_TAG%"
            }
        }
        script {
            name = "Deploy w/ Helmfile"
            scriptContent = """
                cd ./helmfile
                az account set -s %env.SUBSCRIPTION%
                az aks get-credentials --admin --overwrite-existing --resource-group %env.RG_DEV% --name %env.K8S_CLUSTER_NAME%
                helmfile -e %env.TARGET% apply
            """.trimIndent()
        }
    }
    triggers {
        vcs {
            branchFilter = "+:*"
        }
    }
})

object Build_Production: BuildType({
    name = "Build_Production"
    description = "Deploys a defacto production server on github release tag"
    params {
        param("teamcity.vcsTrigger.runBuildInNewEmptyBranch", "true")
        param("env.PROJECT", "scrum-poker-server")
        param("env.BASE_DOMAIN","bdm-dev.dts-stn.com")
        param("env.SUBSCRIPTION", "%vault:dts-sre/data/azure!/decd-dev-subscription-id%")
        param("env.K8S_CLUSTER_NAME", "ESdCDPSBDMK8SDev-K8S")
        param("env.RG_DEV", "ESdCDPSBDMK8SDev")
        param("env.TARGET", "prod")
        param("env.BRANCH", "prod")
    }
    vcs {
        root(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerProduction)
    }
   
    steps {
        dockerCommand {
            name = "Build & Tag Docker Image"
            commandType = build {
                source = file {
                    path = "Dockerfile"
                }
                namesAndTags = "%env.ACR_DOMAIN%/%env.PROJECT%:%env.DOCKER_TAG%"
                commandArgs = "--pull --build-arg TC_BUILD=%build.number%"
            }
        }
        script {
            name = "Login to Azure and ACR"
            scriptContent = """
                az login --service-principal -u %TEAMCITY_USER% -p %TEAMCITY_PASS% --tenant %env.TENANT-ID%
                az account set -s %env.SUBSCRIPTION%
                az acr login -n MTSContainers
            """.trimIndent()
        }
        dockerCommand {
            name = "Push Image to ACR"
            commandType = push {
                namesAndTags = "%env.ACR_DOMAIN%/%env.PROJECT%:%env.DOCKER_TAG%"
            }
        }
        script {
            name = "Deploy w/ Helmfile"
            scriptContent = """
                cd ./helmfile
                az account set -s %env.SUBSCRIPTION%
                az aks get-credentials --admin --overwrite-existing --resource-group %env.RG_DEV% --name %env.K8S_CLUSTER_NAME%
                helmfile -e %env.TARGET% apply
            """.trimIndent()
        }
    }
    triggers {
        vcs {
            branchFilter = """
                    +:*
                    -:refs/heads/main
                 """.trimIndent()
        }
        schedule {
            schedulingPolicy = weekly {
                dayOfWeek = ScheduleTrigger.DAY.Saturday
                hour = 14
                minute = 15
                timezone = "America/New_York"
            }  
            branchFilter = "+:latest*"
            triggerBuild = always()
            withPendingChangesOnly = false
            triggerBuildOnAllCompatibleAgents = true
        }
    }
})

object Build_Performance: BuildType({
    name = "Build_Performance"
    description = "Continuous integration"
    params {
        param("teamcity.vcsTrigger.runBuildInNewEmptyBranch", "true")
        param("env.PROJECT", "scrum-poker-server")
        param("env.BASE_DOMAIN","bdm-dev.dts-stn.com")
        param("env.SUBSCRIPTION", "%vault:dts-sre/data/azure!/decd-dev-subscription-id%")
        param("env.K8S_CLUSTER_NAME", "ESdCDPSBDMK8SDev-K8S")
        param("env.RG_DEV", "ESdCDPSBDMK8SDev")
        param("env.TARGET", "main")
        param("env.BRANCH", "perf")
    }
    vcs {
        root(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerRelease)
    }
   
    steps {
        dockerCommand {
            name = "Build & Tag Docker Image"
            commandType = build {
                source = file {
                    path = "Dockerfile"
                }
                namesAndTags = "%env.ACR_DOMAIN%/%env.PROJECT%:%env.DOCKER_TAG%"
                commandArgs = "--pull --build-arg TC_BUILD=%build.number%"
            }
        }
        script {
            name = "Login to Azure and ACR"
            scriptContent = """
                az login --service-principal -u %TEAMCITY_USER% -p %TEAMCITY_PASS% --tenant %env.TENANT-ID%
                az account set -s %env.SUBSCRIPTION%
                az acr login -n MTSContainers
            """.trimIndent()
        }
        dockerCommand {
            name = "Push Image to ACR"
            commandType = push {
                namesAndTags = "%env.ACR_DOMAIN%/%env.PROJECT%:%env.DOCKER_TAG%"
            }
        }
        script {
            name = "Deploy w/ Helmfile"
            scriptContent = """
                cd ./helmfile
                az account set -s %env.SUBSCRIPTION%
                az aks get-credentials --admin --overwrite-existing --resource-group %env.RG_DEV% --name %env.K8S_CLUSTER_NAME%
                helmfile -e %env.TARGET% apply
            """.trimIndent()
        }
    }
    triggers {
        vcs {
            branchFilter = "+:*"
        }
    }
})

object CleanUpWeekly: BuildType({
    name = "CleanUpWeekly"
    description = "Deletes deployments every saturday"
    params {
        param("teamcity.vcsTrigger.runBuildInNewEmptyBranch", "true")
        param("env.PROJECT", "scrum-poker-server")
        param("env.BASE_DOMAIN","bdm-dev.dts-stn.com")
        param("env.SUBSCRIPTION", "%vault:dts-sre/data/azure!/decd-dev-subscription-id%")
        param("env.K8S_CLUSTER_NAME", "ESdCDPSBDMK8SDev-K8S")
        param("env.RG_DEV", "ESdCDPSBDMK8SDev")
        param("env.TARGET", "main")
        param("env.BRANCH", "%teamcity.build.branch%")
    }
    vcs {
        root(Dev_ScrumPokerServer_HttpsGithubComDtsStnscrumPokerServerDynamic)
    }
    steps {
        script {
            name = "Login and Delete Deployment"
            scriptContent = """
                az login --service-principal -u %TEAMCITY_USER% -p %TEAMCITY_PASS% --tenant %env.TENANT-ID%
                az account set -s %env.SUBSCRIPTION%
                echo %env.PROJECT%-branch
                kubectl get namespace | awk '/^%env.PROJECT%-dyna/{system("kubectl delete namespace " $1)}'
            """.trimIndent()
        }
    }
    triggers {
        schedule {
            schedulingPolicy = weekly {
                dayOfWeek = ScheduleTrigger.DAY.Saturday
                hour = 14
                minute = 15
                timezone = "America/New_York"
            }  
            branchFilter = "+:main"
            triggerBuild = always()
            withPendingChangesOnly = false
            triggerBuildOnAllCompatibleAgents = true
        }
    }
})
