FROM mongo
COPY dump/clades.json .
COPY dump/users.json .
COPY dump/roles.json .

CMD mongoimport --host mongo -d phylex-public -c clades ./clades.json && mongoimport --host mongo -d phylex-admin -c roles ./roles.json && mongoimport --host mongo -d phylex-admin -c users ./users.json

