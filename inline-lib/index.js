module.exports = global.packageJsLibrary =
  global.packageJsLibrary ||
  (function Module() {
    function required_module() {
      try {
        return require("pack-js");
      } catch (err) {
        if (err.code === "MODULE_NOT_FOUND") return false;
        throw err;
      }
    }

    // inline module
    function inline_module() {
      function isObject(item) {
        return item && typeof item === "object" && !Array.isArray(item);
      }

      function deepMerge(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (isObject(target) && isObject(source)) {
          for (const key in source) {
            if (isObject(source[key])) {
              if (!target[key]) Object.assign(target, { [key]: {} });
              deepMerge(target[key], source[key]);
            } else {
              Object.assign(target, { [key]: source[key] });
            }
          }
        }

        return deepMerge(target, ...sources);
      }

      function resolvePackages(packages) {
        const resolvedPackages = {};
        Object.keys(packages).forEach((pkg) => {
          const parts = pkg.split(/[.\/]/g);
          const contents = packages[pkg];
          let current = resolvedPackages;
          for (let i = 0; i < parts.length; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
          }
          if (typeof contents === "function") {
            current.$it = () => {
              const result = contents();
              contents.$it = () => result;
              return result;
            };
          } else deepMerge(current, resolvePackages(contents[pkg]));
        });
        return resolvedPackages;
      }

      function createPackageSystem(description) {
        const packages = (description || {}).packages || {};
        const resolved = resolvePackages(packages);
        let it;
        return (it = {
          packages: resolved,
          pImport(path) {
            const parts = path.split(/[.\/]/g);
            let current = it.packages;
            for (let i = 0; i < parts.length; i++) {
              if (!current[parts[i]]) return undefined;
              current = current[parts[i]];
            }
            if (!current.$it) return undefined;
            return current.$it();
          },
          add(packages) {
            deepMerge(it.packages, resolvePackages(packages));
          },
        });
      }

      const packages = createPackageSystem({});

      return Object.assign(packages, {
        createPackageSystem,
        require: (path) => () => require(`${path}`),
        object: (obj) => () => obj,
        formatVersion: 1,
      });
    }

    return required_module() || inline_module();
  })();
