---
sidebar_position: 1
slug: /
---

# Introduction

[![npm version](https://badge.fury.io/js/payload-dependency-graph.svg)](https://badge.fury.io/js/payload-dependency-graph) [![Test](https://github.com/GeorgeHulpoi/payload-dependency-graph/actions/workflows/test.yml/badge.svg)](https://github.com/GeorgeHulpoi/payload-dependency-graph/actions/workflows/test.yml) [![Downloads](http://img.shields.io/npm/dw/payload-dependency-graph.svg)](https://www.npmjs.com/package/payload-dependency-graph)

This plugin creates a dependency graph between collections and globals. The graph updates automatically, because the plugin observes the changes made on any collection or globals.

Currently this plugin supports different types of implementations:

-   ✅ In Memory Dependency Graph
-   ✅ MongoDB Dependency Graph
-   ❌ PostgreSQL Dependency Graph (currently beta in Payload 2.x)

## Use Cases

The plugin is useful when it comes to cached content or relationship-based changes.

-   You're caching a static page that uses nested relationship fields. If the page has fields with blocks, and these blocks are recursive and have their own relationship fields, it can be difficult to know which cache needs to be purged. For this situation, the plugin is perfect for knowing which resource is dependent on whom.
-   You're caching the API responses that contain a depth greater than 0. You can purge that cache for that specific resource when its dependencies change.
