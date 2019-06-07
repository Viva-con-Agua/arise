set -ex

USERNAME=vivaconagua

publish_vca_docker(){
  docker push $USERNAME/${1}:latest;
  docker push $USERNAME/${1}:${2};
}

publish_vca_docker $@
