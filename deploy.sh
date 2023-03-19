# Build docker image of the service locally
docker build -t messaging:latest .

docker tag messaging:latest 482053628475.dkr.ecr.eu-central-1.amazonaws.com/usupport-messaging-api

# Push image to 
docker push 482053628475.dkr.ecr.eu-central-1.amazonaws.com/usupport-messaging-api

# Update Kuberenetes Cluster applications for this API service
kubectl apply -f config.yaml -f secrets.yaml -f deployment.yaml -f service.yaml
