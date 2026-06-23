describe('ApiService', function() {
  const ApiService = {
    async fetchData(endpoint) {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    },

    renderData(data, selector) {
      const container = document.querySelector(selector);

      if (!container) {
        return false;
      }

      container.innerHTML = data
        .map((item) => `<li data-id="${item.id}">${item.name}</li>`)
        .join('');

      return true;
    },
  };

  const DataProcessor = {
    mapData(rawData) {
      return rawData.map((item) => ({
        id: item.id,
        name: item.name,
        label: item.name.toUpperCase(),
      }));
    },

    filterData(rawData) {
      return rawData.filter((item) => item.active === true);
    },

    reduceData(rawData) {
      return rawData.reduce((acc, item) => acc + item.value, 0);
    },
  };

  let originalFetch;

  beforeEach(function() {
    originalFetch = window.fetch;
  });

  afterEach(function() {
    window.fetch = originalFetch;

    const fixture = document.getElementById('api-spec-fixture');
    if (fixture) {
      fixture.remove();
    }
  });

  describe('fetchData()', function() {
    it('debe obtener datos exitosamente de la API', async function() {
      const mockData = [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' },
      ];

      spyOn(window, 'fetch').and.resolveTo({
        ok: true,
        status: 200,
        json: async function() {
          return mockData;
        },
      });

      // Test de caso exitoso
      const data = await ApiService.fetchData('/endpoint');
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(2);
    });

    it('debe manejar errores HTTP correctamente', async function() {
      spyOn(window, 'fetch').and.resolveTo({
        ok: false,
        status: 404,
        json: async function() {
          return { message: 'Not Found' };
        },
      });

      // Test de error 404
      try {
        await ApiService.fetchData('/invalid-endpoint');
        fail('Deberia haber lanzado un error');
      } catch (error) {
        expect(error.message).toContain('HTTP error');
        expect(error.message).toContain('404');
      }
    });

    it('debe manejar errores de red correctamente', async function() {
      spyOn(window, 'fetch').and.rejectWith(new Error('Network error'));

      try {
        await ApiService.fetchData('/endpoint');
        fail('Deberia haber lanzado un error de red');
      } catch (error) {
        expect(error.message).toContain('Network error');
      }
    });
  });

  describe('DataProcessor', function() {
    it('debe procesar datos con map correctamente', function() {
      const rawData = [{ id: 1, name: 'Test' }];
      const processed = DataProcessor.mapData(rawData);

      expect(processed).toBeDefined();
      expect(processed.length).toBe(1);
      expect(processed[0].label).toBe('TEST');
    });

    it('debe procesar datos con filter correctamente', function() {
      const rawData = [
        { id: 1, active: true },
        { id: 2, active: false },
        { id: 3, active: true },
      ];

      const filtered = DataProcessor.filterData(rawData);

      expect(filtered.length).toBe(2);
      expect(filtered.every((item) => item.active)).toBe(true);
    });

    it('debe procesar datos con reduce correctamente', function() {
      const rawData = [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
        { id: 3, value: 5 },
      ];

      const total = DataProcessor.reduceData(rawData);

      expect(total).toBe(35);
    });
  });

  describe('Integracion con DOM', function() {
    it('debe renderizar datos en el DOM cuando aplica', function() {
      const fixture = document.createElement('div');
      fixture.id = 'api-spec-fixture';
      fixture.innerHTML = '<ul id="api-list"></ul>';
      document.body.appendChild(fixture);

      const data = [
        { id: 1, name: 'Elemento A' },
        { id: 2, name: 'Elemento B' },
      ];

      const result = ApiService.renderData(data, '#api-list');
      const items = document.querySelectorAll('#api-list li');

      expect(result).toBe(true);
      expect(items.length).toBe(2);
      expect(items[0].textContent).toBe('Elemento A');
    });
  });
});
