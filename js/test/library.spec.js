describe('LibraryService', function() {
  const ExternalLibrary = {
    init(options) {
      return {
        ready: true,
        options,
      };
    },

    execute(input) {
      if (!input || !Array.isArray(input.items)) {
        throw new Error('Invalid input');
      }

      return input.items.map((item) => ({
        id: item.id,
        value: item.value * 2,
      }));
    },
  };

  const LibraryService = {
    instance: null,

    initialize(options) {
      this.instance = ExternalLibrary.init(options);
      return this.instance;
    },

    configure(options) {
      if (!this.instance) {
        throw new Error('Library not initialized');
      }

      this.instance.options = {
        ...this.instance.options,
        ...options,
      };

      return this.instance.options;
    },

    runMainFeature(data) {
      return ExternalLibrary.execute(data);
    },

    runAndRender(data, selector) {
      const result = this.runMainFeature(data);
      const container = document.querySelector(selector);

      if (!container) {
        return false;
      }

      container.innerHTML = result
        .map((item) => `<span data-id="${item.id}">${item.value}</span>`)
        .join('');

      return true;
    },
  };

  beforeEach(function() {
    LibraryService.instance = null;
  });

  afterEach(function() {
    const fixture = document.getElementById('library-spec-fixture');
    if (fixture) {
      fixture.remove();
    }
  });

  describe('initialize()', function() {
    it('debe inicializar la libreria correctamente', function() {
      const instance = LibraryService.initialize({
        mode: 'test',
      });

      expect(instance).toBeDefined();
      expect(instance.ready).toBe(true);
      expect(instance.options.mode).toBe('test');
    });

    it('debe aplicar configuracion correctamente', function() {
      LibraryService.initialize({ mode: 'test', retries: 1 });
      const config = LibraryService.configure({ retries: 3, timeout: 2000 });

      expect(config.mode).toBe('test');
      expect(config.retries).toBe(3);
      expect(config.timeout).toBe(2000);
    });

    it('debe ejecutar la funcionalidad principal integrada', function() {
      const data = {
        items: [
          { id: 1, value: 10 },
          { id: 2, value: 7 },
        ],
      };

      const result = LibraryService.runMainFeature(data);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);
      expect(result[0].value).toBe(20);
    });

    it('debe manejar errores de la libreria correctamente', function() {
      try {
        LibraryService.runMainFeature({});
        fail('Deberia haber lanzado un error');
      } catch (error) {
        expect(error.message).toContain('Invalid input');
      }
    });

    it('debe interactuar con otras partes del sistema (DOM)', function() {
      const fixture = document.createElement('div');
      fixture.id = 'library-spec-fixture';
      fixture.innerHTML = '<div id="library-output"></div>';
      document.body.appendChild(fixture);

      const data = {
        items: [
          { id: 1, value: 5 },
          { id: 2, value: 9 },
        ],
      };

      const rendered = LibraryService.runAndRender(data, '#library-output');
      const outputNodes = document.querySelectorAll('#library-output span');

      expect(rendered).toBe(true);
      expect(outputNodes.length).toBe(2);
      expect(outputNodes[0].textContent).toBe('10');
      expect(outputNodes[1].textContent).toBe('18');
    });
  });
});
