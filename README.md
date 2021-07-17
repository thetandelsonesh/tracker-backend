
### Sequelize Model Generation
```
npx sequelize-cli model:generate --name vehicle --attributes license:string,model:string,engine:string,chassis:string
npx sequelize-cli model:generate --name track --attributes vehicleId:string
npx sequelize-cli model:generate --name place --attributes name:string
```


### Sequelize Seed Generation
```
npx sequelize-cli seed:generate --name vehicle
npx sequelize-cli seed:generate --name tracks
npx sequelize-cli seed:generate --name places
```


### Sequelize Migration
```
npx sequelize-cli db:migrate --env development
npx sequelize-cli db:migrate --env production
```

### Sequelize Seeding
```
npx sequelize-cli db:seed:all --env development
npx sequelize-cli db:seed:all --env production
```