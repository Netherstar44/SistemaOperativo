export type Family = 'Orígenes' | 'UNIX' | 'Linux' | 'Microsoft' | 'Apple' | 'BSD' | 'Móvil' | 'IBM' | 'Personal' | 'Solaris' | 'Plan 9' | 'Cloud' | 'DEC';

export type HistoryNode = {
  id: string;
  name: string;
  year: string;
  yearNum: number;
  family: Family;
  type: string;
  color: string;
  size: 'major' | 'standard';
  tagline: string;
  description: string;
  context: string;
  technical: string;
  people: string;
  legacy: string;
  why: string;
  influences: string[];
  descendants: string[];
  source: { label: string; href: string };
  x: number;
  y: number;
  era?: 'mainframes' | 'unix' | 'personal' | 'open' | 'mobile' | 'cloud';
  isTrunk?: boolean;
  themeClass?: string;
};

export const historyNodes: HistoryNode[] = [
  {
    id: 'multics', name: 'MULTICS', year: '1964', yearNum: 1964, family: 'Orígenes', type: 'Sistema de tiempo compartido', color: '#9aafbf', size: 'standard',
    tagline: 'La idea de un ordenador como servicio continuo.',
    description: 'MULTICS imaginó un sistema informático grande, seguro y disponible de forma permanente para muchos usuarios. Aunque resultó demasiado ambicioso para su época, convirtió conceptos de investigación en una arquitectura coherente.',
    context: 'Nació en el MIT, Bell Labs y General Electric cuando la informática dejaba de ser únicamente cálculo por lotes. El reto era compartir un mainframe sin que cada programa tuviera que conocer los detalles de la máquina.',
    technical: 'Introdujo memoria virtual, anillos de protección, segmentación, jerarquía de archivos y tiempo compartido como partes de un mismo diseño.',
    people: 'Fernando Corbató, Robert Daley y los equipos de MIT, Bell Labs y GE.',
    legacy: 'Su vocabulario y arquitectura influyeron directamente en Unix y en la manera de pensar los sistemas operativos multiusuario.',
    why: 'Mucho de lo que hoy damos por sentado —usuarios simultáneos, permisos y archivos jerárquicos— fue primero una apuesta de investigación.',
    influences: [], descendants: ['unix'], source: { label: 'MIT — Multics history', href: 'https://www.multicians.org/history.html' }, x: 7, y: 50, era: 'mainframes',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'os360', name: 'OS/360', year: '1964', yearNum: 1964, family: 'IBM', type: 'Mainframe', color: '#889eb0', size: 'standard',
    tagline: 'Un sistema operativo para toda una familia de máquinas.',
    description: 'IBM OS/360 fue una apuesta industrial sin precedentes: un sistema común para una línea completa de mainframes. Su escala convirtió la ingeniería de software en una disciplina de gestión y arquitectura.',
    context: 'Las empresas necesitaban proteger inversiones en hardware y programas. IBM quiso que los modelos de la familia System/360 compartieran software, periféricos y una identidad común.',
    technical: 'Multiprogramación, spooling, gestión de memoria y una gran familia de configuraciones. Su desarrollo mostró el coste de coordinar millones de líneas de código.',
    people: 'Fred Brooks y miles de ingenieros de IBM.',
    legacy: 'Definió prácticas de sistemas empresariales y dejó una línea evolutiva que llega hasta z/OS.',
    why: 'La historia de los sistemas operativos también es la historia de hacer software a escala industrial.',
    influences: [], descendants: ['vms'], source: { label: 'IBM Archives — System/360', href: 'https://www.ibm.com/ibm/history/exhibits/mainframe/mainframe_PP2025.html' }, x: 7, y: 80, era: 'mainframes',
    isTrunk: false, themeClass: 'theme-crt-green'
  },
  {
    id: 'unix', name: 'UNIX', year: '1969', yearNum: 1969, family: 'UNIX', type: 'Sistema operativo', color: '#54d9c0', size: 'major',
    tagline: 'Pequeño, componible y escrito para ser entendido.',
    description: 'Unix nació como una respuesta deliberadamente pequeña a la complejidad de MULTICS. Su fuerza no fue una única función, sino una filosofía: herramientas que hacen una cosa, archivos como interfaz y un entorno que invita a experimentar.',
    context: 'En Bell Labs, Ken Thompson recuperó un PDP-7 para construir un sistema que el equipo pudiera usar y modificar. Dennis Ritchie y Thompson lo trasladaron al PDP-11 y, más tarde, al lenguaje C.',
    technical: 'Procesos, pipes, permisos, shell, sistema de archivos jerárquico y una interfaz de texto que separaba programas del hardware.',
    people: 'Ken Thompson, Dennis Ritchie, Brian Kernighan y el equipo de Bell Labs.',
    legacy: 'Es el gran ancestro conceptual de BSD, macOS, iOS, Android y la familia GNU/Linux.',
    why: 'Unix no solo entregó un sistema: entregó una forma de construir sistemas, y esa forma sobrevivió a varias generaciones de hardware.',
    influences: ['multics'], descendants: ['bsd', 'systemv', 'minix', 'plan9', 'amigaos', 'beos'], source: { label: 'Bell Labs — The UNIX History', href: 'https://www.bell-labs.com/usr/dmr/www/chist.html' }, x: 18, y: 50, era: 'unix',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'bsd', name: 'BSD', year: '1977', yearNum: 1977, family: 'BSD', type: 'Distribución Unix', color: '#66b6d5', size: 'standard',
    tagline: 'La universidad amplió Unix y lo volvió una familia.',
    description: 'Berkeley Software Distribution empezó como un conjunto de mejoras y programas para Unix. Con el tiempo se convirtió en una familia con identidad propia, fuerte en redes, investigación y sistemas robustos.',
    context: 'La Universidad de California, Berkeley, recibió código fuente de Unix y construyó alrededor de él una comunidad de investigación abierta.',
    technical: 'La pila TCP/IP de Berkeley, sockets, el editor vi, Fast File System y el trabajo de Bill Joy marcaron la informática conectada.',
    people: 'Bill Joy, Marshall Kirk McKusick y la comunidad de Berkeley.',
    legacy: 'FreeBSD, OpenBSD, NetBSD y Darwin mantienen viva parte de esta línea.',
    why: 'BSD demuestra que una comunidad académica puede convertir un sistema en una plataforma de innovación.',
    influences: ['unix'], descendants: ['nextstep', 'mac-system1'], source: { label: 'CSRG Archives — Berkeley Unix', href: 'https://www.usenix.org/legacy/publications/library/proceedings/bsdcon/2002/mckusick.html' }, x: 30, y: 20, era: 'unix',
    isTrunk: true, themeClass: 'theme-tux'
  },
  {
    id: 'vms', name: 'VAX/VMS', year: '1977', yearNum: 1977, family: 'DEC', type: 'Sistema propietario', color: '#a292bf', size: 'standard',
    tagline: 'El diseño arquitectónico maestro de Dave Cutler.',
    description: 'VMS fue el sistema operativo estrella de DEC para sus computadores VAX. Su arquitectura altamente estable, orientada al multiprocesamiento y la memoria virtual protegida influyó profundamente en los sistemas de gama alta y corporativos de la época.',
    context: 'Digital Equipment Corporation (DEC) diseñó VAX para suceder a sus minicomputadores PDP. Dave Cutler lideró el desarrollo de VMS enfocado en un rendimiento y seguridad implacables para el sector corporativo y científico.',
    technical: 'Introdujo un sistema avanzado de archivos (Files-11), memoria virtual con paginación limpia, seguridad multinivel nativa y APIs altamente coherentes que inspiraron directamente el diseño posterior de Windows NT.',
    people: 'Dave Cutler y el equipo de ingenieros de DEC.',
    legacy: 'Muchas de sus ideas de ingeniería migraron directamente con Dave Cutler cuando Microsoft lo contrató para crear Windows NT.',
    why: 'Representa el puente conceptual perfecto entre la computación científica institucional y la arquitectura de los sistemas empresariales modernos.',
    influences: ['os360'], descendants: ['windows'], source: { label: 'Digital Technical Journal — VAX/VMS', href: 'https://archive.org/details/dtj-vax-vms' }, x: 30, y: 80, era: 'unix',
    isTrunk: false, themeClass: 'theme-crt-green'
  },
  {
    id: 'cp-m', name: 'CP/M', year: '1974', yearNum: 1974, family: 'Personal', type: 'Sistema para microordenadores', color: '#d99d61', size: 'standard',
    tagline: 'El puente entre terminal y ordenador personal.',
    description: 'CP/M llevó un sistema de disco y una interfaz de comandos a microordenadores basados en el Intel 8080 y Z80. Su diseño influyó en la forma en que la primera generación de PCs organizó archivos, programas y unidades.',
    context: 'Gary Kildall desarrolló CP/M en un momento en que los microprocesadores empezaban a ser suficientemente capaces para ejecutar software general.',
    technical: 'BIOS separada del núcleo, sistema de archivos de 8 pulgadas y una interfaz de comandos portable entre máquinas compatibles.',
    people: 'Gary Kildall y Digital Research.',
    legacy: 'Aunque no fue el antecesor directo de Windows NT, su ecosistema preparó el mercado de sistemas personales y sus convenciones reaparecieron en DOS.',
    why: 'CP/M muestra que la computación personal no empezó con una única empresa: fue un ecosistema de máquinas pequeñas que aprendió a compartir software.',
    influences: [], descendants: ['msdos'], source: { label: 'Computer History Museum — Gary Kildall', href: 'https://computerhistory.org/profile/gary-kildall/' }, x: 22, y: 80, era: 'personal',
    isTrunk: true, themeClass: 'theme-dos-blue'
  },
  {
    id: 'msdos', name: 'MS-DOS', year: '1981', yearNum: 1981, family: 'Microsoft', type: 'Sistema de disco', color: '#d99d61', size: 'standard',
    tagline: 'El lenguaje de la primera PC compatible.',
    description: 'MS-DOS fue el sistema de línea de comandos que acompañó al IBM PC y sus compatibles. Su modelo simple encajaba con máquinas de memoria limitada y convirtió al software de PC en un mercado masivo.',
    context: 'Microsoft licenció 86-DOS y lo adaptó para IBM. La compatibilidad de hardware dio a DOS una difusión que ningún sistema personal había alcanzado.',
    technical: 'Sistema de archivos FAT, programas residentes y una interfaz de comandos con acceso directo a recursos de la máquina.',
    people: 'Tim Paterson, Microsoft e IBM.',
    legacy: 'Su ecosistema desembocó en Windows 3.x y en la rama de consumo de Windows hasta Windows ME.',
    why: 'DOS explica por qué la historia de los sistemas operativos también es una historia de estándares comerciales.',
    influences: ['cp-m'], descendants: ['windows'], source: { label: 'Computer History Museum — DOS', href: 'https://www.computerhistory.org/timeline/software/' }, x: 37, y: 80, era: 'personal',
    isTrunk: true, themeClass: 'theme-dos-blue'
  },
  {
    id: 'mac-system1', name: 'System 1', year: '1984', yearNum: 1984, family: 'Apple', type: 'Sistema con GUI', color: '#c9a7ed', size: 'standard',
    tagline: 'La interfaz gráfica se democratiza de forma masiva.',
    description: 'El sistema operativo clásico de Macintosh introdujo los conceptos de escritorio, ventanas superpuestas, menús desplegables y la papelera de reciclaje al público general, revolucionando la interacción usuario-máquina.',
    context: 'Inspirados por las visitas de Steve Jobs a Xerox PARC, el equipo de desarrollo de Macintosh diseñó un sistema operativo completamente orientado a la interfaz gráfica, diseñado específicamente para hardware de bajo coste.',
    technical: 'Gestión coordinada de memoria para recursos gráficos integrados, sistema de archivos Macintosh File System (MFS) y una multitarea cooperativa básica.',
    people: 'Steve Jobs, Andy Hertzfeld, Bill Atkinson, Susan Kare y el equipo de Macintosh.',
    legacy: 'Definió la metáfora de escritorio que adoptaron casi todos los sistemas operativos comerciales contemporáneos, incluido Windows.',
    why: 'Cambió para siempre el paradigma: el ordenador personal ya no requería memorizar comandos de terminal para ser utilizado.',
    influences: ['bsd'], descendants: ['nextstep'], source: { label: 'Folklore.org — Macintosh Development', href: 'https://www.folklore.org' }, x: 42, y: 20, era: 'personal',
    isTrunk: true, themeClass: 'theme-mac-mono'
  },
  {
    id: 'nextstep', name: 'NeXTSTEP', year: '1989', yearNum: 1989, family: 'Apple', type: 'Unix Orientado a Objetos', color: '#b28ecf', size: 'standard',
    tagline: 'El Unix revolucionario y estético de Steve Jobs.',
    description: 'NeXTSTEP combinó un microkernel Mach, APIs orientadas a objetos escritas en Objective-C y una interfaz de usuario increíblemente pulida en 3D. Fue la plataforma donde Tim Berners-Lee creó la primera World Wide Web.',
    context: 'Tras su salida de Apple, Steve Jobs fundó NeXT Inc. para crear estaciones de trabajo educativas avanzadas. La base de software de este proyecto terminó convirtiéndose en el salvavidas tecnológico de Apple a su regreso.',
    technical: 'Microkernel Mach con subsistema BSD Unix, visualización de pantalla Display PostScript para un renderizado WYSIWYG impecable y frameworks que aceleraban enormemente el desarrollo.',
    people: 'Steve Jobs, Avie Tevanian, Leo Dagum y el equipo de NeXT.',
    legacy: 'Cuando Apple compró NeXT en 1996, NeXTSTEP se convirtió en los cimientos directos sobre los que se construyó Mac OS X (Darwin).',
    why: 'Demostró que un núcleo Unix robusto e industrial podía casarse perfectamente con un entorno orientado a objetos ágil y una estética visual soberbia.',
    influences: ['bsd'], descendants: ['darwin'], source: { label: 'NeXT Computer Historical Archive', href: 'http://www.nextcomputers.org/' }, x: 55, y: 20, era: 'open',
    isTrunk: true, themeClass: 'theme-aqua'
  },
  {
    id: 'gnu-hurd', name: 'GNU Hurd', year: '1990', yearNum: 1990, family: 'UNIX', type: 'Microkernel de investigación', color: '#54d9c0', size: 'standard',
    tagline: 'La visión pura del microkernel libre del proyecto GNU.',
    description: 'Diseñado por la Free Software Foundation para servir de núcleo nativo del sistema operativo GNU. Su arquitectura basada en servidores cooperativos descentralizados buscaba dar la máxima libertad de personalización técnica.',
    context: 'El proyecto GNU de Richard Stallman ya disponía de compiladores, shells e intérpretes en 1990, pero carecía de núcleo. Se inició Hurd para completar el ecosistema libre bajo un innovador diseño de microkernel.',
    technical: 'Una colección de servidores (o traductores) que corren sobre el microkernel GNU Mach, interactuando para proporcionar llamadas al sistema estándar tipo POSIX.',
    people: 'Richard Stallman, Thomas Bushnell, Roland McGrath.',
    legacy: 'Debido a su complejidad arquitectónica, su desarrollo se dilató. Esto abrió la ventana para que Linus Torvalds publicara Linux en 1991 como alternativa monolítica más sencilla.',
    why: 'Muestra que el diseño técnico ambicioso a veces choca con la velocidad de adopción práctica de alternativas pragmáticas.',
    influences: ['unix'], descendants: [], source: { label: 'GNU Hurd Portal', href: 'https://www.gnu.org/software/hurd/' }, x: 48, y: 62, era: 'unix',
    isTrunk: false, themeClass: 'theme-crt-green'
  },
  {
    id: 'minix', name: 'MINIX', year: '1987', yearNum: 1987, family: 'UNIX', type: 'Microkernel educativo', color: '#54d9c0', size: 'standard',
    tagline: 'Aprender sistemas operativos construyéndolos.',
    description: 'MINIX fue diseñado para enseñar cómo funciona un sistema operativo moderno. Su microkernel y su código legible pusieron la arquitectura de sistemas al alcance de una generación de estudiantes.',
    context: 'Andrew S. Tanenbaum necesitaba un Unix que pudiera distribuirse con su libro de sistemas operativos sin las restricciones de las licencias comerciales.',
    technical: 'Microkernel, servidores en espacio de usuario, comunicación por mensajes y un diseño deliberadamente pequeño.',
    people: 'Andrew S. Tanenbaum y sus estudiantes.',
    legacy: 'Su impacto educativo fue enorme. Linux se desarrolló en el mismo contexto, pero no es una continuación de su código: fue un proyecto independiente inspirado por el entorno.',
    why: 'MINIX conecta la investigación con el aula: enseña que la arquitectura también es una decisión pedagógica.',
    influences: ['unix'], descendants: ['linux'], source: { label: 'MINIX 3 — History', href: 'https://www.minix3.org/doc/history.html' }, x: 48, y: 38, era: 'unix',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'linux', name: 'Linux', year: '1991', yearNum: 1991, family: 'Linux', type: 'Kernel', color: '#f4bf5f', size: 'major',
    tagline: 'Un kernel personal que se volvió infraestructura mundial.',
    description: 'Linux comenzó como un proyecto personal de Linus Torvalds en Helsinki y terminó como un punto de encuentro para comunidades, empresas y fabricantes. El kernel no es una distribución: es el núcleo alrededor del cual GNU, herramientas y comunidades construyen sistemas completos.',
    context: 'En 1991, los ordenadores personales eran más accesibles y Unix comercial seguía fuera del alcance de muchos estudiantes. Torvalds buscaba aprender sobre su 386 y publicó el proyecto para colaborar.',
    technical: 'Kernel monolítico modular, multitarea preventiva, memoria virtual, redes, drivers y una licencia GPL que permite estudiar, modificar y redistribuir el código.',
    people: 'Linus Torvalds, Andrew S. Tanenbaum, Richard Stallman y miles de mantenedores.',
    legacy: 'Linux mueve servidores, supercomputadores, contenedores, dispositivos embebidos, Android y gran parte de la nube.',
    why: 'Linux importa porque convirtió la colaboración distribuida y el código abierto en una infraestructura confiable a escala planetaria.',
    influences: ['minix'], descendants: ['debian', 'redhat', 'android', 'cloud', 'symbian'], source: { label: 'Linux Kernel Archives — 30 years', href: 'https://www.kernel.org/' }, x: 60, y: 50, era: 'open',
    isTrunk: true, themeClass: 'theme-tux'
  },
  {
    id: 'windows', name: 'Windows NT', year: '1993', yearNum: 1993, family: 'Microsoft', type: 'Sistema operativo', color: '#d99d61', size: 'major',
    tagline: 'La rama profesional que terminó unificando Windows.',
    description: 'Windows NT separó a Microsoft de las limitaciones de DOS con un diseño moderno, portable y protegido. Su arquitectura se convirtió en la base de Windows 2000, XP y la línea contemporánea.',
    context: 'Microsoft necesitaba una plataforma para estaciones de trabajo y servidores que pudiera competir con Unix sin abandonar el enorme mercado de Windows.',
    technical: 'Kernel híbrido, memoria protegida, abstracción de hardware, seguridad por usuarios y soporte para múltiples arquitecturas.',
    people: 'Dave Cutler y el equipo de Microsoft.',
    legacy: 'Desde Windows XP, la línea NT es el tronco de Windows de escritorio, servidor y desarrollo.',
    why: 'La transición DOS → NT muestra cómo un sistema popular puede reinventar su interior sin abandonar a sus usuarios.',
    influences: ['vms', 'msdos'], descendants: [], source: { label: 'Microsoft Learn — Windows NT', href: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/windows-nt-architecture' }, x: 68, y: 80, era: 'open',
    isTrunk: true, themeClass: 'theme-win95'
  },
  {
    id: 'darwin', name: 'Darwin / macOS', year: '2001', yearNum: 2001, family: 'Apple', type: 'Sistema operativo', color: '#c9a7ed', size: 'standard',
    tagline: 'Unix debajo de una experiencia personal cuidadosamente diseñada.',
    description: 'Mac OS X unió la interfaz de Apple con Darwin, una base abierta derivada de NeXTSTEP, Mach y componentes BSD. La combinación hizo visible una genealogía Unix en el ordenador personal.',
    context: 'Tras adquirir NeXT, Apple obtuvo una base técnica para reemplazar el Mac OS clásico sin renunciar a su lenguaje de diseño.',
    technical: 'XNU (Mach + componentes BSD), memoria protegida, multitarea preventiva, frameworks y una interfaz gráfica integrada.',
    people: 'Steve Jobs, Avie Tevanian y los equipos de NeXT y Apple.',
    legacy: 'Darwin es la base de macOS, iOS, iPadOS, watchOS y tvOS.',
    why: 'Apple muestra otra forma de heredar Unix: ocultar su complejidad detrás de una experiencia coherente.',
    influences: ['nextstep'], descendants: ['ios'], source: { label: 'Apple Open Source — Darwin', href: 'https://opensource.apple.com/' }, x: 75, y: 20, era: 'open',
    isTrunk: true, themeClass: 'theme-aqua'
  },
  {
    id: 'debian', name: 'Debian', year: '1993', yearNum: 1993, family: 'Linux', type: 'Distribución', color: '#f4bf5f', size: 'standard',
    tagline: 'Una comunidad y un contrato social alrededor de Linux.',
    description: 'Debian organizó el kernel Linux, las herramientas GNU y una enorme colección de paquetes en una distribución comunitaria. Su trabajo de integración es una de las razones por las que Linux puede ser un sistema completo.',
    context: 'Ian Murdock propuso un proyecto abierto, no controlado por una sola empresa, cuando la comunidad Linux todavía estaba construyendo sus primeras herramientas.',
    technical: 'Sistema de paquetes .deb, APT, políticas de calidad y arquitecturas múltiples.',
    people: 'Ian Murdock y la comunidad Debian.',
    legacy: 'Ubuntu, Linux Mint y una amplia constelación de sistemas derivan de Debian.',
    why: 'Debian demuestra que un sistema operativo también puede ser una obra social: reglas, cuidado y acuerdos importan tanto como el kernel.',
    influences: ['linux'], descendants: ['ubuntu'], source: { label: 'Debian — History', href: 'https://www.debian.org/doc/manuals/project-history/' }, x: 70, y: 38, era: 'open',
    isTrunk: true, themeClass: 'theme-tux'
  },
  {
    id: 'redhat', name: 'Red Hat', year: '1994', yearNum: 1994, family: 'Linux', type: 'Distribución empresarial', color: '#f4bf5f', size: 'standard',
    tagline: 'Linux encontró un modelo para el mundo empresarial.',
    description: 'Red Hat convirtió Linux en una plataforma con soporte, certificaciones y ciclos de vida previsibles para empresas. Fedora y RHEL mantienen una relación entre innovación comunitaria y estabilidad comercial.',
    context: 'Servidores e instituciones querían usar Linux, pero necesitaban garantías, documentación y un interlocutor profesional.',
    technical: 'RPM, gestión de paquetes, SELinux, herramientas empresariales y una gran participación en el desarrollo del kernel.',
    people: 'Marc Ewing, Bob Young y la comunidad Fedora / Red Hat.',
    legacy: 'RHEL es central en centros de datos, nube híbrida y plataformas de contenedores.',
    why: 'La historia de Linux no es solo hobby: también es cómo una comunidad crea tecnología para sistemas críticos.',
    influences: ['linux'], descendants: [], source: { label: 'Red Hat — Company history', href: 'https://www.redhat.com/en/about/company-history' }, x: 70, y: 62, era: 'open',
    isTrunk: false, themeClass: 'theme-tux'
  },
  {
    id: 'ubuntu', name: 'Ubuntu', year: '2004', yearNum: 2004, family: 'Linux', type: 'Distribución', color: '#f4bf5f', size: 'standard',
    tagline: 'Hacer que Linux fuera una puerta de entrada.',
    description: 'Ubuntu partió de Debian con la ambición de ofrecer lanzamientos regulares, una experiencia cuidada y soporte sencillo. Su llegada amplió la conversación sobre Linux en el escritorio y luego en la nube.',
    context: 'Canonical detectó que la comunidad necesitaba una distribución fácil de instalar y mantener, sin perder la base colaborativa de Debian.',
    technical: 'APT, lanzamientos periódicos, Live CD, escritorio GNOME y una fuerte orientación a servidores y cloud.',
    people: 'Mark Shuttleworth, Canonical y la comunidad Ubuntu.',
    legacy: 'Ubuntu es una de las distribuciones más visibles en educación, desarrollo, servidores y computación cloud.',
    why: 'Ubuntu hizo de traductor: llevó prácticas del mundo Unix/Linux a personas que no habían usado una terminal.',
    influences: ['debian'], descendants: [], source: { label: 'Ubuntu — About the project', href: 'https://ubuntu.com/about' }, x: 82, y: 38, era: 'open',
    isTrunk: true, themeClass: 'theme-tux'
  },
  {
    id: 'symbian', name: 'Symbian OS', year: '1997', yearNum: 1997, family: 'Móvil', type: 'SO para Smartphones', color: '#7ed6a7', size: 'standard',
    tagline: 'El pionero absoluto de los teléfonos móviles inteligentes.',
    description: 'Symbian gobernó el mercado temprano de smartphones de la década de 2000, destacando por su rendimiento extremo en chips débiles y bajo uso de memoria. Fue el núcleo de los legendarios móviles Nokia.',
    context: 'Nacido como evolución del sistema EPOC de Psion, los gigantes del móvil (Nokia, Ericsson, Motorola) crearon el consorcio Symbian para impedir que Microsoft controlara los dispositivos del futuro.',
    technical: 'Arquitectura orientada a objetos compacta, multitarea preventiva estricta basada en microkernel, gestión de memoria extremadamente optimizada para prevenir fugas y APIs específicas de telecomunicación.',
    people: 'Nokia, Ericsson y el consorcio Symbian.',
    legacy: 'Estableció las bases operativas de las redes inalámbricas modernas y fue el objetivo de mercado al que iOS y Android atacaron para redefinir el móvil táctil.',
    why: 'Nos enseña que un sistema operativo puede reinar un mercado por una década y quedar rápidamente obsoleto al no adaptarse a interfaces de usuario capacitivas táctiles.',
    influences: ['linux'], descendants: [], source: { label: 'Symbian OS Foundation Archives', href: 'https://symbianos.org' }, x: 76, y: 66, era: 'open',
    isTrunk: false, themeClass: 'theme-mobile'
  },
  {
    id: 'android', name: 'Android', year: '2008', yearNum: 2008, family: 'Móvil', type: 'Plataforma móvil', color: '#7ed6a7', size: 'major',
    tagline: 'El kernel Linux salió del servidor y entró en el bolsillo.',
    description: 'Android usa el kernel Linux como base de una plataforma móvil con runtime, framework de aplicaciones y una cadena de fabricantes. Su escala convirtió a Linux en el núcleo de miles de millones de dispositivos.',
    context: 'El smartphone exigía gestionar radios, energía, sensores y aplicaciones en hardware muy diverso. Google y la Open Handset Alliance construyeron una plataforma alrededor de Linux.',
    technical: 'Kernel Linux modificado, Binder IPC, sandbox por aplicación, runtime Android y capas de hardware.',
    people: 'Andy Rubin, Google y la Open Handset Alliance.',
    legacy: 'Android es una de las mayores distribuciones de Linux por número de dispositivos, aunque su experiencia sea distinta de GNU/Linux de escritorio.',
    why: 'Android recuerda que un kernel puede tener muchas vidas: el mismo ancestro sostiene experiencias tecnológicas radicalmente diferentes.',
    influences: ['linux'], descendants: [], source: { label: 'Android Open Source Project', href: 'https://source.android.com/docs' }, x: 88, y: 62, era: 'mobile',
    isTrunk: true, themeClass: 'theme-mobile'
  },
  {
    id: 'cloud', name: 'Linux en la nube', year: '2010 →', yearNum: 2010, family: 'Linux', type: 'Infraestructura', color: '#f4bf5f', size: 'major',
    tagline: 'El sistema operativo invisible de la infraestructura.',
    description: 'En la nube, Linux dejó de ser una elección de escritorio y se convirtió en una capa de infraestructura: máquinas virtuales, contenedores, Kubernetes, supercomputación y servicios de Internet.',
    context: 'La virtualización y los centros de datos necesitaban un sistema flexible, automatizable y capaz de correr sobre hardware diverso. El modelo abierto de Linux encajó con esa escala.',
    technical: 'Namespaces, cgroups, eBPF, KVM, redes programables y soporte para arquitecturas x86, ARM y más.',
    people: 'Comunidades del kernel, administradores, empresas cloud y mantenedores de proyectos abiertos.',
    legacy: 'La mayor parte de la web moderna y de la computación científica se apoya en esta familia de herramientas.',
    why: 'La historia culmina en un sistema que muchas veces no vemos: Linux organiza el espacio donde viven las aplicaciones.',
    influences: ['linux'], descendants: [], source: { label: 'Linux Foundation — What is Linux?', href: 'https://www.linuxfoundation.org/about/linux' }, x: 95, y: 50, era: 'cloud',
    isTrunk: true, themeClass: 'theme-cloud'
  },
  {
    id: 'amigaos', name: 'AmigaOS', year: '1985', yearNum: 1985, family: 'Personal', type: 'Sistema multimedia', color: '#d99d61', size: 'standard',
    tagline: 'Multitarea gráfica cuando el escritorio aún estaba naciendo.',
    description: 'AmigaOS combinó un entorno gráfico, multitarea preventiva y coprocesadores especializados en un ordenador doméstico con una personalidad técnica muy marcada.',
    context: 'Commodore buscaba diferenciar al Amiga en un mercado donde la computadora personal empezaba a ser también una máquina creativa y multimedia.',
    technical: 'Exec como núcleo multitarea, bibliotecas compartidas, Intuition para la interfaz y un diseño muy cercano al hardware.',
    people: 'Jay Miner, RJ Mical, Dave Needle y el equipo de Amiga.',
    legacy: 'Su arquitectura inspiró a comunidades de usuarios y proyectos posteriores como MorphOS y AROS; no fue una rama de Unix ni de Linux.',
    why: 'AmigaOS recuerda que la historia también avanza por experiencias alternativas, no solo por las plataformas que dominaron el mercado.',
    influences: ['unix'], descendants: [], source: { label: 'AmigaOS Documentation Wiki', href: 'https://wiki.amigaos.net/wiki/Main_Page' }, x: 46, y: 92, era: 'personal',
    isTrunk: false, themeClass: 'theme-mac-mono'
  },
  {
    id: 'beos', name: 'BeOS', year: '1995', yearNum: 1995, family: 'Personal', type: 'Sistema multimedia', color: '#d99d61', size: 'standard',
    tagline: 'Diseñado desde cero para medios y paralelismo.',
    description: 'BeOS fue creado para estaciones multimedia y apostó por un sistema de archivos con metadatos, multiprocesamiento y una interfaz limpia. Su adopción fue limitada, pero su diseño dejó una huella intelectual.',
    context: 'Be Inc. quiso superar las limitaciones de los sistemas de escritorio existentes para edición de audio, vídeo y gráficos.',
    technical: 'Kernel con soporte para múltiples procesadores, sistema de archivos BFS y una arquitectura orientada a hilos.',
    people: 'Jean-Louis Gassée y el equipo de Be Inc.',
    legacy: 'Haiku mantiene una implementación compatible en espíritu y API; BeOS no es un ancestro directo de macOS o Linux.',
    why: 'Un sistema puede ser influyente por sus ideas incluso cuando no se convierte en una plataforma masiva.',
    influences: ['unix'], descendants: [], source: { label: 'Haiku Project — History', href: 'https://www.haiku-os.org/about/haiku/' }, x: 72, y: 92, era: 'open',
    isTrunk: false, themeClass: 'theme-aqua'
  },
  {
    id: 'systemv', name: 'System V', year: '1983', yearNum: 1983, family: 'UNIX', type: 'Unix comercial', color: '#54d9c0', size: 'standard',
    tagline: 'La estandarización comercial de la familia Unix.',
    description: 'Unix System V fue una línea de AT&T que consolidó interfaces y tecnologías para fabricantes y empresas. Su influencia convivió con BSD y con otras ramas Unix, en vez de reemplazarlas por completo.',
    context: 'La licencia de Unix permitió que múltiples universidades y compañías desarrollaran variantes; System V fue el intento de ordenar una parte comercial del árbol.',
    technical: 'IPC, STREAMS, memoria compartida y una base para sistemas Unix empresariales posteriores.',
    people: 'AT&T Unix Support Group y los fabricantes que licenciaron Unix.',
    legacy: 'Sus interfaces y descendientes comerciales influyeron en Solaris, AIX, HP-UX y estándares POSIX.',
    why: 'La historia de Unix es una red de líneas relacionadas, no una cadena lineal de versiones.',
    influences: ['unix'], descendants: ['solaris'], source: { label: 'The Open Group — UNIX history', href: 'https://www.opengroup.org/unix/history' }, x: 34, y: 34, era: 'unix',
    isTrunk: false, themeClass: 'theme-crt-green'
  },
  {
    id: 'os2', name: 'OS/2', year: '1987', yearNum: 1987, family: 'IBM', type: 'Sistema de escritorio', color: '#889eb0', size: 'standard',
    tagline: 'La alianza PC que buscó una base más protegida.',
    description: 'OS/2 nació de la colaboración entre IBM y Microsoft para superar el modelo de DOS en los PCs compatibles. Después de la separación de ambas compañías, IBM continuó su propia línea.',
    context: 'El PC necesitaba multitarea, memoria protegida y una plataforma capaz de manejar aplicaciones de oficina más complejas.',
    technical: 'Multitarea preventiva, memoria protegida, Presentation Manager y soporte para ejecutar programas DOS.',
    people: 'IBM, Microsoft y equipos de desarrollo de ambas compañías.',
    legacy: 'No es el origen de Windows NT, aunque compartió problemas de diseño y parte de su contexto de mercado; OS/2 mantuvo presencia en nichos empresariales.',
    why: 'OS/2 hace visible que la competencia de plataformas también ocurre entre socios y que coexistir no significa influir directamente.',
    influences: ['os360'], descendants: [], source: { label: 'IBM Archives — OS/2', href: 'https://www.ibm.com/ibm/history/exhibits/pc/pc_14.html' }, x: 51, y: 92, era: 'personal',
    isTrunk: false, themeClass: 'theme-win95'
  },
  {
    id: 'aix', name: 'AIX', year: '1986', yearNum: 1986, family: 'IBM', type: 'Unix empresarial', color: '#889eb0', size: 'standard',
    tagline: 'Unix optimizado para la ingeniería empresarial de IBM.',
    description: 'AIX es la familia Unix de IBM para estaciones de trabajo y servidores. Su historia une tecnologías de Unix System V, BSD y desarrollos propios de IBM sobre arquitecturas POWER.',
    context: 'IBM necesitaba un Unix robusto para sistemas RISC y, más tarde, para sus servidores empresariales.',
    technical: 'JFS/JFS2, LVM, virtualización y herramientas de administración orientadas a grandes instalaciones.',
    people: 'IBM Research, IBM Software y comunidades de administradores Unix.',
    legacy: 'AIX sigue siendo una plataforma propietaria de misión crítica; su existencia no implica una descendencia de Linux.',
    why: 'AIX muestra cómo Unix se adaptó a distintos fabricantes y necesidades sin perder un vocabulario común.',
    influences: ['unix'], descendants: [], source: { label: 'IBM Documentation — AIX', href: 'https://www.ibm.com/docs/en/aix' }, x: 44, y: 8, era: 'open',
    isTrunk: false, themeClass: 'theme-tux'
  },
  {
    id: 'solaris', name: 'Solaris', year: '1992', yearNum: 1992, family: 'Solaris', type: 'Unix empresarial', color: '#78c8c2', size: 'standard',
    tagline: 'Observabilidad y escala para servidores SPARC.',
    description: 'Solaris, de Sun Microsystems, convirtió tecnologías Unix en una plataforma de servidores con fuerte énfasis en redes, multiprocesamiento y administración operativa.',
    context: 'Sun construyó estaciones y servidores para una Internet temprana que exigía sistemas Unix capaces de crecer sin perder control.',
    technical: 'DTrace, ZFS, Solaris Zones y una evolución de SunOS basada en la tradición BSD/System V.',
    people: 'Sun Microsystems, Bill Joy y equipos de ingeniería de Solaris.',
    legacy: 'Sus ideas de observabilidad, almacenamiento y aislamiento perduran más allá de la plataforma; Solaris no deriva de Linux.',
    why: 'Solaris es una buena lección sobre influencia técnica: una idea puede viajar aunque la marca original pierda centralidad.',
    influences: ['systemv'], descendants: [], source: { label: 'Oracle Solaris Documentation', href: 'https://docs.oracle.com/en/operating-systems/solaris.html' }, x: 54, y: 8, era: 'open',
    isTrunk: false, themeClass: 'theme-tux'
  },
  {
    id: 'plan9', name: 'Plan 9', year: '1992', yearNum: 1992, family: 'Plan 9', type: 'Sistema de investigación', color: '#78c8c2', size: 'standard',
    tagline: 'La investigación de Bell Labs después de Unix.',
    description: 'Plan 9 exploró una visión distribuida en la que recursos locales y remotos podían presentarse mediante una interfaz de archivos uniforme. Fue un laboratorio de ideas, no un sucesor comercial de Unix.',
    context: 'El equipo de Bell Labs quería repensar redes, estaciones de trabajo y colaboración tras la experiencia de Unix.',
    technical: '9P, per-process namespaces, el sistema de archivos virtual /net y el lenguaje Limbo en Inferno.',
    people: 'Rob Pike, Ken Thompson, Dave Presotto y el equipo de Bell Labs.',
    legacy: 'Influyó en conversaciones sobre namespaces, sistemas distribuidos y diseño de herramientas; la influencia es conceptual, no una línea de código hacia Linux.',
    why: 'Plan 9 demuestra que los museos también deben conservar experimentos que no ganaron el mercado.',
    influences: ['unix'], descendants: [], source: { label: 'Bell Labs — Plan 9', href: 'https://9p.io/plan9/' }, x: 56, y: 34, era: 'unix',
    isTrunk: false, themeClass: 'theme-crt-green'
  },
  {
    id: 'ios', name: 'iOS', year: '2007', yearNum: 2007, family: 'Móvil', type: 'Sistema móvil', color: '#7ed6a7', size: 'major',
    tagline: 'Darwin y Unix reinterpretados para una pantalla táctil.',
    description: 'iOS comparte la base Darwin/XNU con macOS, pero organiza su experiencia alrededor de energía limitada, seguridad de aplicaciones y una interfaz táctil.',
    context: 'El iPhone exigió adaptar tecnologías de escritorio a un dispositivo móvil cerrado, sensible a la batería, radios y gestos.',
    technical: 'XNU, sandboxing, frameworks móviles, firma de código y una cadena de arranque segura.',
    people: 'Apple, equipos de NeXT y los grupos de ingeniería del iPhone.',
    legacy: 'Consolidó un modelo de plataforma móvil integrada; es descendiente de Darwin, no de Linux.',
    why: 'iOS ayuda a distinguir una genealogía de una coexistencia: dos plataformas móviles pueden resolver problemas parecidos desde bases distintas.',
    influences: ['darwin'], descendants: [], source: { label: 'Apple Platform Security', href: 'https://support.apple.com/guide/security/welcome/web' }, x: 88, y: 20, era: 'mobile',
    isTrunk: true, themeClass: 'theme-mobile'
  },
];

const nodeIds = new Set(historyNodes.map((node) => node.id));

export const connections = historyNodes.flatMap((node) =>
  node.descendants
    .filter((target) => nodeIds.has(target))
    .map((target) => ({ from: node.id, to: target }))
);

export const families = ['Todos', 'Linux', 'UNIX', 'Microsoft', 'Apple', 'BSD', 'Móvil', 'Orígenes', 'IBM', 'Personal', 'Solaris', 'Plan 9', 'DEC'] as const;
export const routeLinuxIds = ['unix', 'minix', 'linux', 'debian', 'ubuntu', 'redhat', 'android', 'cloud'];

export const getNode = (id: string) => historyNodes.find((node) => node.id === id);

export type Reference = {
  title: string;
  author: string;
  year: string;
  category: 'Libro' | 'Artículo Histórico' | 'Sitio Web';
  description: string;
  url?: string;
};

export const bibliographicReferences: Reference[] = [
  {
    title: "Operating System Concepts",
    author: "Abraham Silberschatz, Peter B. Galvin, Greg Gagne",
    year: "2018 (10ª Edición)",
    category: "Libro",
    description: "Conocido popularmente como 'el libro del dinosaurio', es el texto académico estándar de referencia para entender la teoría de los sistemas operativos modernos (procesos, memoria, sistemas de archivos)."
  },
  {
    title: "Modern Operating Systems",
    author: "Andrew S. Tanenbaum, Herbert Bos",
    year: "2014 (4ª Edición)",
    category: "Libro",
    description: "Escrito por el creador de MINIX, este libro combina la teoría fundamental de sistemas operativos con el análisis detallado de la arquitectura de Linux, Windows y Android."
  },
  {
    title: "The Design and Implementation of the FreeBSD Operating System",
    author: "Marshall Kirk McKusick, George V. Neville-Neil, Robert N.M. Watson",
    year: "2014",
    category: "Libro",
    description: "Una obra maestra que explica en detalle el diseño interno, la gestión de memoria y el sistema de red del descendiente directo más popular de Unix de Berkeley (BSD)."
  },
  {
    title: "The Unix Time-Sharing System",
    author: "Dennis M. Ritchie, Ken Thompson",
    year: "1974",
    category: "Artículo Histórico",
    description: "El artículo seminal publicado en Communications of the ACM que presentó Unix al mundo, detallando su sistema de archivos jerárquico y filosofía de diseño simplificado.",
    url: "https://dl.acm.org/doi/10.1145/361011.361061"
  },
  {
    title: "Just for Fun: The Story of an Accidental Revolutionary",
    author: "Linus Torvalds, David Diamond",
    year: "2001",
    category: "Libro",
    description: "La autobiografía oficial de Linus Torvalds, donde relata de forma amena y humorística el nacimiento del kernel Linux, su rivalidad académica con Tanenbaum y la filosofía detrás del código abierto."
  },
  {
    title: "Showstopper! The Breakneck Race to Create Windows NT",
    author: "G. Pascal Zachary",
    year: "1994",
    category: "Libro",
    description: "Una crónica fascinante sobre el desarrollo de Windows NT y el liderazgo obsesivo de Dave Cutler para crear un sistema operativo de nivel empresarial desde cero."
  },
  {
    title: "The Multics History Website",
    author: "Multicians Group",
    year: "1994 - Presente",
    category: "Sitio Web",
    description: "Sitio web histórico dedicado a la recopilación de documentos, código fuente y anécdotas de MULTICS, el predecesor directo de UNIX.",
    url: "https://www.multicians.org"
  },
  {
    title: "GNU Project: The GNU Operating System",
    author: "Free Software Foundation",
    year: "1983 - Presente",
    category: "Sitio Web",
    description: "El portal oficial del Proyecto GNU, que documenta el manifiesto del software libre, el diseño del microkernel GNU Hurd y las herramientas que completaron a GNU/Linux.",
    url: "https://www.gnu.org"
  }
];