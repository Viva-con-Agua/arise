set -ex

USERNAME=vivaconagua

publish_vca_docker(){
  docker tag $USERNAME/${1}:latest $USERNAME/${1}:${2};
  docker push $USERNAME/${1}:latest;
  docker push $USERNAME/${1}:${2};
}

publish_vca_docker $@
