# bq_fixturer

## Introduction
This project is born from some frustration regarding integration testing with BigQuery.
It's often hard to ensure we're using the right data and have fixtures related to your development
branches (it tends to add a lot of tables that you then forget and get obsolete and the rest of them doesn't know if they can cleanup).

So I started to make some manual fixtures for my project out of some production like data.
Yet it's pretty tedious to transform the output to something that can be reused to the point
that I often gave up testing some cases (and to find out - obviously - that I shouldn't have skipped them) to meet time to market expectations.

So reducing the testing phase time, I hope that I can improve the coverage of my queries since it often contains most of the business logic (to reduce the load on the http server).

It can save quite some time to you as well, so here we go:
[Try it yourself](https://kayrnt.github.io/bq_fixturer/)

## Build & run
```
yarn install && yarn start
```

## Test

```
yarn test
```

## Package

```
yarn build
```
