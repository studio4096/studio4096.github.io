# studio4096 Web Site

### Installation
#### Requirements
- docker
- (hugo)

#### Command
```
cp -p .env{.sample,}
```

```
docker-compose up -d
```

```
docker exec -it studio4096_front sh
```

### Commands

On Docker dontainer

#### install node packages

```
yarn install
```

#### serve

```
yarn start
```

#### build

```
yarn build
```

### Deploy

```
git subtree push --prefix public origin gh-pages
```
