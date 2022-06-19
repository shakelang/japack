const { expect } = require("chai");
const packageJs = require("./lib");

const {
  default: def,
  add,
  pImport,
  packages,
  createPackageSystem,
  require: requireFunction,
} = packageJs;

module.exports = "packagejs tests :)";

describe("package.js", () => {
  describe("package-system", () => {
    describe("createPackageSystem", () => {
      it("should create a package system with no contents", () => {
        const pkg = createPackageSystem();
        expect(pkg).to.exist;
      });
      it("should create a package system with contents", () => {
        const pkg = createPackageSystem({
          packages: {
            "io.github.shakelang.packagejs.test": requireFunction(
              `${__dirname}/tests.js`
            ),
          },
        });
        expect(pkg).to.exist;
        expect(pkg.packages).to.exist;
        expect(pkg.packages.io).to.exist;
        expect(pkg.packages.io.github).to.exist;
        expect(pkg.packages.io.github.shakelang).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test.$it).to.exist;
      });
      it("should create a package system with contents (multiple packages)", () => {
        const pkg = createPackageSystem({
          packages: {
            "io.github.shakelang.packagejs.test": requireFunction(
              `${__dirname}/tests.js`
            ),
            "io.github.shakelang.packagejs.test2": requireFunction(
              `${__dirname}/tests.js`
            ),
          },
        });
        expect(pkg).to.exist;
        expect(pkg.packages).to.exist;
        expect(pkg.packages.io).to.exist;
        expect(pkg.packages.io.github).to.exist;
        expect(pkg.packages.io.github.shakelang).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test.$it).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test2).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test2.$it).to.exist;
      });
      it("should create a package system with contents (even more packages)", () => {
        const pkg = createPackageSystem({
          packages: {
            "io.github.shakelang.packagejs.test": requireFunction(
              `${__dirname}/tests.js`
            ),
            "io.github.shakelang.packagejs.test2": requireFunction(
              `${__dirname}/tests.js`
            ),
            "io.github.shake.packagejs.test": requireFunction(
              `${__dirname}/tests.js`
            ),
          },
        });
        expect(pkg).to.exist;
        expect(pkg.packages).to.exist;
        expect(pkg.packages.io).to.exist;
        expect(pkg.packages.io.github).to.exist;
        expect(pkg.packages.io.github.shakelang).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test.$it).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test2).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test2.$it).to.exist;
        expect(pkg.packages.io.github.shake).to.exist;
        expect(pkg.packages.io.github.shake.packagejs).to.exist;
        expect(pkg.packages.io.github.shake.packagejs.test).to.exist;
        expect(pkg.packages.io.github.shake.packagejs.test.$it).to.exist;
      });
    });
    describe("add", () => {
      it("should add a package", () => {
        const pkg = createPackageSystem();
        pkg.add({
          "io.github.shakelang.packagejs.test": requireFunction(
            `${__dirname}/tests.js`
          ),
        });
        expect(pkg.packages).to.exist;
        expect(pkg.packages.io).to.exist;
        expect(pkg.packages.io.github).to.exist;
        expect(pkg.packages.io.github.shakelang).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test).to.exist;
      });

      it("should add a package (multiple packages)", () => {
        const pkg = createPackageSystem();
        pkg.add({
          "io.github.shakelang.packagejs.test": requireFunction(
            `${__dirname}/tests.js`
          ),
          "io.github.shakelang.packagejs.test2": requireFunction(
            `${__dirname}/tests.js`
          ),
        });
        expect(pkg.packages).to.exist;
        expect(pkg.packages.io).to.exist;
        expect(pkg.packages.io.github).to.exist;
        expect(pkg.packages.io.github.shakelang).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test2).to.exist;
      });

      it("should add a package (even more packages)", () => {
        const pkg = createPackageSystem();
        pkg.add({
          "io.github.shakelang.packagejs.test": requireFunction(
            `${__dirname}/tests.js`
          ),
          "io.github.shakelang.packagejs.test2": requireFunction(
            `${__dirname}/tests.js`
          ),
          "io.github.shake.packagejs.test": requireFunction(
            `${__dirname}/tests.js`
          ),
        });
        expect(pkg.packages).to.exist;
        expect(pkg.packages.io).to.exist;
        expect(pkg.packages.io.github).to.exist;
        expect(pkg.packages.io.github.shakelang).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test).to.exist;
        expect(pkg.packages.io.github.shakelang.packagejs.test2).to.exist;
        expect(pkg.packages.io.github.shake).to.exist;
        expect(pkg.packages.io.github.shake.packagejs).to.exist;
        expect(pkg.packages.io.github.shake.packagejs.test).to.exist;
      });
    });

    describe("pImport", () => {
      it("should import a package", () => {
        const pkg = createPackageSystem({
          packages: {
            "io.github.shakelang.packagejs.test": () => "test",
          },
        });
        const test = pkg.pImport("io.github.shakelang.packagejs.test");
        expect(test).to.exist;
        expect(test).to.equal("test");
      });
      it("should import a package (multiple packages)", () => {
        const pkg = createPackageSystem({
          packages: {
            "io.github.shakelang.packagejs.test": () => "test1",
            "io.github.shakelang.packagejs.test2": () => "test2",
          },
        });
        const test = pkg.pImport("io.github.shakelang.packagejs.test");
        const test2 = pkg.pImport("io.github.shakelang.packagejs.test2");
        expect(test).to.exist;
        expect(test2).to.exist;
        expect(test).to.equal("test1");
        expect(test2).to.equal("test2");
      });
      it("should import a package (even more packages)", () => {
        const pkg = createPackageSystem({
          packages: {
            "io.github.shakelang.packagejs.test": () => "test1",
            "io.github.shakelang.packagejs.test2": () => "test2",
            "io.github.shake.packagejs.test": () => "test3",
          },
        });
        const test = pkg.pImport("io.github.shakelang.packagejs.test");
        const test2 = pkg.pImport("io.github.shakelang.packagejs.test2");
        const test3 = pkg.pImport("io.github.shake.packagejs.test");
        expect(test).to.exist;
        expect(test2).to.exist;
        expect(test3).to.exist;
        expect(test).to.equal("test1");
        expect(test2).to.equal("test2");
        expect(test3).to.equal("test3");
      });
      it("non-existing package should return undefined", () => {
        const pkg = createPackageSystem({
          packages: {
            "io.github.shakelang.packagejs.test": requireFunction(
              `${__dirname}/tests.js`
            ),
            "io.github.shakelang.packagejs.test2": requireFunction(
              `${__dirname}/tests.js`
            ),
            "io.github.shake.packagejs.test": requireFunction(
              `${__dirname}/tests.js`
            ),
          },
        });
        const test = pkg.pImport("io.github.shakelang.packagejs.test3");
        expect(test).to.not.exist;
      });
    });
  });

  describe("require function", () => {
    it("should require a package", () => {
      expect(requireFunction(`${__dirname}/tests.js`)()).to.equal(
        module.exports
      );
    });
  });

  describe("Global Package System", () => {
    it("test global package (add & import)", () => {
      add({ "io.github.shakelang.packagejs.test": () => "test" });
      expect(packages).to.exist;
      expect(packages.io).to.exist;
      expect(packages.io.github).to.exist;
      expect(packages.io.github.shakelang).to.exist;
      expect(packages.io.github.shakelang.packagejs).to.exist;
      expect(packages.io.github.shakelang.packagejs.test).to.exist;

      const test = pImport("io.github.shakelang.packagejs.test");
      expect(test).to.exist;
      expect(test).to.equal("test");
    });
  });
});
