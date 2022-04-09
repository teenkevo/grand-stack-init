 After running certbot and generating SSL certs for the client, we share them with the Neo4j encryption service.

 Run these terminal commands while in this directory to generate the folder structure for the neo4j db SSL certs (bolt, cluster and https). This directory is mounted to the neo4j container.

```sh
export MY_DOMAIN=vlearned.com
```
```sh
for certsource in bolt cluster https ; do
   sudo ln -s ~/learn-app/docker-deploy/client-nginx/live-production/certbot/conf/live/$MY_DOMAIN/fullchain.pem $certsource/neo4j.cert
   sudo ln -s ~/learn-app/docker-deploy/client-nginx/live-production/certbot/conf/live/$MY_DOMAIN/privkey.pem $certsource/neo4j.key
   sudo mkdir $certsource/trusted
   sudo ln -s ~/learn-app/docker-deploy/client-nginx/live-production/certbot/conf/live/$MY_DOMAIN/fullchain.pem $certsource/trusted/neo4j.cert;
done
```

