workspace(
    name = "slack_notification"
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Skylib is a library of Starlark functions for manipulating collections, file paths, and various other data types in the domain of Bazel build rules.
# https://github.com/bazelbuild/bazel-skylib
bazel_skylib_version = "1.1.1"
http_archive(
    name = "bazel_skylib",
    sha256 = "c6966ec828da198c5d9adbaa94c05e3a1c7f21bd012a0b29ba8ddbccb2c93b0d",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/{version}/bazel-skylib-{version}.tar.gz".format(version = bazel_skylib_version),
        "https://github.com/bazelbuild/bazel-skylib/releases/download/{version}/bazel-skylib-{version}.tar.gz".format(version = bazel_skylib_version),
    ],
)
load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")
bazel_skylib_workspace()

http_archive(
    name = "rules_nodejs",
    sha256 = "8fc8e300cb67b89ceebd5b8ba6896ff273c84f6099fc88d23f24e7102319d8fd",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.8.4/rules_nodejs-core-5.8.4.tar.gz"],
)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "709cc0dcb51cf9028dd57c268066e5bc8f03a119ded410a13b5c3925d6e43c48",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.8.4/rules_nodejs-5.8.4.tar.gz"],
)
load("@build_bazel_rules_nodejs//:index.bzl", "check_rules_nodejs_version", "node_repositories", "yarn_install")

http_archive(
    name = "rules_nodejs",
    sha256 = "08337d4fffc78f7fe648a93be12ea2fc4e8eb9795a4e6aa48595b66b34555626",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.8.0/rules_nodejs-core-5.8.0.tar.gz"],
)

load("@rules_nodejs//nodejs:yarn_repositories.bzl", "yarn_repositories")

# Setup the Node.js toolchain
# NOTE: node ≥ 16 is required for Macs with M1 chips
node_version = "18.17.0"

node_repositories(
    node_version = node_version,
    node_repositories = {
        "18.17.0-darwin_amd64": ("node-v18.17.0-darwin-x64.tar.gz", "node-v18.17.0-darwin-x64", "2f381442381f7fbde2ca644c3275bec9c9c2a8d361f467b40e39428acdd6ccff"),
        "18.17.0-darwin_arm64": ("node-v18.17.0-darwin-arm64.tar.gz", "node-v18.17.0-darwin-arm64", "19731ef427e77ad9c5f476eb62bfb02a7f179d3012feed0bbded62e45f23e679"),
        "18.17.0-linux_amd64": ("node-v18.17.0-linux-x64.tar.xz", "node-v18.17.0-linux-x64", "f36facda28c4d5ce76b3a1b4344e688d29d9254943a47f2f1909b1a10acb1959"),
        "18.17.0-windows_amd64": ("node-v18.17.0-win-x64.zip", "node-v18.17.0-win-x64", "06e30b4e70b18d794651ef132c39080e5eaaa1187f938721d57edae2824f4e96"),
    },
)

yarn_version = "1.22.19"
yarn_repositories(
    name = "yarn",
    yarn_version = yarn_version,
)

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)