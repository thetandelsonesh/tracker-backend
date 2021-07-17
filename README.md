
### Sequelize Model Generation
```
npx sequelize-cli model:generate --name vehicle --attributes licence:string,model:string,engine:string,chasis:string
npx sequelize-cli model:generate --name track --attributes vehicle_id:string
```


### Sequelize Seed Generation
```
npx sequelize-cli seed:generate --name vehicle
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