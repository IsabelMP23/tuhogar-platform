const { Builder, By, Key } = require("selenium-webdriver");

async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function testNavegacionCompleta() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // Abrir sitio principal
    await driver.get("http://localhost:4321");
    console.log("Página cargada");
    await sleep(1500);

    // Ver título
    const title = await driver.getTitle();
    console.log("Título:", title);
    await sleep(1500);

    // Navegar por cada enlace del header (versión desktop)
    const paginas = [
      { id: null, selector: 'a[href="/propiedades"]', nombre: "Propiedades" },
      { id: null, selector: 'a[href="/servicios"]', nombre: "Servicios" },
      { id: null, selector: 'a[href="/conocenos"]', nombre: "Conócenos" },
      { id: "btnContactanos", selector: null, nombre: "Contáctanos" },
    ];

    for (const pagina of paginas) {
      let elemento;

      if (pagina.id) {
        elemento = await driver.findElement(By.id(pagina.id));
      } else {
        elemento = await driver.findElement(By.css(pagina.selector));
      }

      await elemento.click();
      console.log("Visitó:", pagina.nombre);
      await sleep(2000);
    }

    //Regresar al inicio
    await driver.findElement(By.css('a[href="/"]')).click();
    await sleep(2000);

    // Cambiar a tamaño móvil
    console.log("Cambiando a modo móvil...");
    await driver.manage().window().setRect({ width: 375, height: 800 });
    await sleep(2000);

    // Abrir menú móvil
    const btnMenu = await driver.findElement(By.id("mobile-menu-btn"));
    await btnMenu.click();
    console.log("Menú móvil abierto");
    await sleep(2000);

    //Seleccionar enlace del menú móvil (Servicios)
    const linkMovil = await driver.findElement(
      By.id("btnServiciosMobile")
    );
    await linkMovil.click();
    console.log("Página móvil visitada: Servicios");
    await sleep(2000);

  
    console.log("Test de navegación COMPLETO");

  } catch (error) {
    console.error("Error en la prueba:", error);
  } finally {
    await driver.quit();
  }
}

testNavegacionCompleta();