export type Family = 'Orígenes' | 'UNIX' | 'Linux' | 'Microsoft' | 'Apple' | 'BSD' | 'Móvil' | 'IBM';

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
    influences: [], descendants: ['unix'], source: { label: 'MIT — Multics history', href: 'https://www.multicians.org/history.html' }, x: 10, y: 26,
  },
  {
    id: 'os360', name: 'OS/360', year: '1964', yearNum: 1964, family: 'IBM', type: 'Mainframe', color: '#9aafbf', size: 'standard',
    tagline: 'Un sistema operativo para toda una familia de máquinas.',
    description: 'IBM OS/360 fue una apuesta industrial sin precedentes: un sistema común para una línea completa de mainframes. Su escala convirtió la ingeniería de software en una disciplina de gestión y arquitectura.',
    context: 'Las empresas necesitaban proteger inversiones en hardware y programas. IBM quiso que los modelos de la familia System/360 compartieran software, periféricos y una identidad común.',
    technical: 'Multiprogramación, spooling, gestión de memoria y una gran familia de configuraciones. Su desarrollo mostró el coste de coordinar millones de líneas de código.',
    people: 'Fred Brooks y miles de ingenieros de IBM.',
    legacy: 'Definió prácticas de sistemas empresariales y dejó una línea evolutiva que llega hasta z/OS.',
    why: 'La historia de los sistemas operativos también es la historia de hacer software a escala industrial.',
    influences: [], descendants: [], source: { label: 'IBM Archives — System/360', href: 'https://www.ibm.com/ibm/history/exhibits/mainframe/mainframe_PP2025.html' }, x: 19, y: 73,
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
    influences: ['multics'], descendants: ['bsd', 'minix', 'systemv', 'linux', 'darwin'], source: { label: 'Bell Labs — The UNIX History', href: 'https://www.bell-labs.com/usr/dmr/www/chist.html' }, x: 34, y: 31,
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
    influences: ['unix'], descendants: ['darwin'], source: { label: 'CSRG Archives — Berkeley Unix', href: 'https://www.usenix.org/legacy/publications/library/proceedings/bsdcon/2002/mckusick.html' }, x: 49, y: 16,
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
    influences: ['unix'], descendants: ['linux'], source: { label: 'MINIX 3 — History', href: 'https://www.minix3.org/doc/history.html' }, x: 51, y: 47,
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
    influences: [], descendants: ['windows'], source: { label: 'Computer History Museum — DOS', href: 'https://www.computerhistory.org/timeline/software/' }, x: 36, y: 77,
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
    influences: [], descendants: [], source: { label: 'Microsoft Learn — Windows NT', href: 'https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/windows-nt-architecture' }, x: 70, y: 78,
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
    influences: ['bsd', 'unix'], descendants: [], source: { label: 'Apple Open Source — Darwin', href: 'https://opensource.apple.com/' }, x: 83, y: 25,
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
    influences: ['unix', 'minix'], descendants: ['debian', 'redhat', 'android', 'cloud'], source: { label: 'Linux Kernel Archives — 30 years', href: 'https://www.kernel.org/' }, x: 65, y: 47,
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
    influences: ['linux'], descendants: ['ubuntu'], source: { label: 'Debian — History', href: 'https://www.debian.org/doc/manuals/project-history/' }, x: 77, y: 37,
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
    influences: ['linux'], descendants: [], source: { label: 'Red Hat — Company history', href: 'https://www.redhat.com/en/about/company-history' }, x: 83, y: 54,
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
    influences: ['debian'], descendants: [], source: { label: 'Ubuntu — About the project', href: 'https://ubuntu.com/about' }, x: 91, y: 36,
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
    influences: ['linux'], descendants: [], source: { label: 'Android Open Source Project', href: 'https://source.android.com/docs' }, x: 91, y: 68,
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
    influences: ['linux'], descendants: [], source: { label: 'Linux Foundation — What is Linux?', href: 'https://www.linuxfoundation.org/about/linux' }, x: 96, y: 50,
  },
];

const nodeIds = new Set(historyNodes.map((node) => node.id));

export const connections = historyNodes.flatMap((node) =>
  node.descendants
    .filter((target) => nodeIds.has(target))
    .map((target) => ({ from: node.id, to: target }))
);

export const families = ['Todos', 'Linux', 'UNIX', 'Microsoft', 'Apple', 'BSD', 'Móvil', 'Orígenes', 'IBM'] as const;
export const routeLinuxIds = ['unix', 'minix', 'linux', 'debian', 'ubuntu', 'redhat', 'android', 'cloud'];

export const getNode = (id: string) => historyNodes.find((node) => node.id === id);