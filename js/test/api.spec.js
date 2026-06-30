import ApiService from '../api/apiService.js';

describe('ApiService (real)', function() {
  let originalFetch;

  beforeEach(function() {
    originalFetch = window.fetch;
  });

  afterEach(function() {
    window.fetch = originalFetch;
  });

  describe('fetchData()', function() {
    it('debe obtener datos y devolverlos sanitizados', async function() {
      const mockData = {
        results: [
          {
            id: 10,
            title: 'Pelicula A',
            poster_path: '/poster-a.jpg',
            genre_ids: [28],
            release_date: '2026-05-01'
          }
        ]
      };

      spyOn(window, 'fetch').and.resolveTo({
        ok: true,
        status: 200,
        json: async function() {
          return mockData;
        }
      });

      const data = await ApiService.fetchData('/endpoint');

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(1);
      expect(data[0].id).toBe('10');
      expect(data[0].title).toBe('Pelicula A');
      expect(data[0].categoria).toBe('Accion');
      expect(data[0].imagen).toContain('https://image.tmdb.org/t/p/w500');
    });

    it('debe exponer error controlado para HTTP no exitoso', async function() {
      spyOn(window, 'fetch').and.resolveTo({
        ok: false,
        status: 404,
        json: async function() {
          return { message: 'Not Found' };
        }
      });

      try {
        await ApiService.fetchData('/invalid-endpoint');
        fail('Deberia haber lanzado un error');
      } catch (error) {
        expect(error.message).toBe('HTTP_404');
        expect(error.userMessage).toBe('El servidor respondió con un error.');
      }
    });
  });

  describe('HOF reales de ApiService', function() {
    it('sanitizarDatos() debe aplicar filter y map sobre los datos reales', function() {
      const datosEntrada = {
        results: [
          {
            id: 1,
            title: 'Titulo <B>',
            genre_ids: [35],
            poster_path: '/uno.jpg',
            release_date: '2026-03-10'
          },
          {
            id: null,
            title: 'Sin ID'
          },
          {
            id: 2,
            title: 'Dos',
            categoria: 'Drama',
            imagen: 'assets/images/demo.jpg',
            funciones: [
              {
                id: 'f-ok',
                cine: 'Palermo',
                idioma: 'Espanol',
                horario: '18:00',
                asientosDisponibles: 20,
                precio: 100
              },
              {
                id: '',
                cine: 'Palermo',
                idioma: 'Espanol',
                horario: '18:00',
                asientosDisponibles: 0,
                precio: 0
              }
            ]
          }
        ]
      };

      const salida = ApiService.sanitizarDatos(datosEntrada);

      expect(salida.length).toBe(2);
      expect(salida[0].id).toBe('1');
      expect(salida[0].title).toBe('Titulo B');
      expect(salida[0].categoria).toBe('Comedia');
      expect(salida[1].funciones.length).toBe(1);
      expect(salida[1].funciones[0].id).toBe('f-ok');
    });

    it('calcularMetricasCatalogo() debe usar reduce y devolver metricas reales', function() {
      const datos = [
        { categoria: 'Accion' },
        { categoria: 'Accion' },
        { categoria: 'Drama' },
        { categoria: '' },
      ];

      const metricas = ApiService.calcularMetricasCatalogo(datos);

      expect(metricas.total).toBe(4);
      expect(metricas.porCategoria.Accion).toBe(2);
      expect(metricas.porCategoria.Drama).toBe(1);
      expect(metricas.porCategoria['Sin categoria']).toBe(1);
      expect(metricas.categoriaPrincipal).toBe('Accion');
    });
  });
});
