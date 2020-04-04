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
git remote add gh-pages git@github.com:studio4096/studio4096.github.io.git
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
git subtree push --prefix public gh-pages master
```

