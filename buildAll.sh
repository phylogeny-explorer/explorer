./dockerSub.sh tree-api $1
./dockerSub.sh user-api $1
./dockerSub.sh client $1
./dockerSub.sh daemon $1

docker push phylogenyexplorer/client:$1
docker push phylogenyexplorer/daemon:$1
docker push phylogenyexplorer/tree-api:$1
docker push phylogenyexplorer/user-api:$1


