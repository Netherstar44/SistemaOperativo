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
    id: 'pre-os', name: 'Antes de los SO', year: 'Pre-SO', yearNum: 1837, family: 'Orígenes', type: 'Lenguaje de Máquina', color: '#e58e35', size: 'major',
    tagline: 'Complejo y primitivo',
    description: 'Previo a la aparición de los sistemas operativos, los programadores debían interactuar con el computador directamente con el hardware mediante el uso del lenguaje de máquina.\n\nEsto resultaba siendo un proceso complejo y de alta duración que no era para nada eficiente.\n\nUn caso notable de esto se dio alrededor del año 1837 con la máquina analítica de Charles Babbage. Puesto que para programarla, Ada Lovelace, quien es considerada la primera programadora de la historia, tuvo que hacer uso de tarjetas perforadas de papel inspiradas en los telares de Jacquard.',
    context: 'Antes de contar con sistemas operativos, la programación exigía manipular interruptores, cables o tarjetas perforadas directamente sobre el hardware sin capas de abstracción.',
    technical: 'Programación directa en lenguaje de máquina y tarjetas perforadas inspiradas en los telares de Jacquard. Sin multiprogramación, memoria virtual ni gestión de archivos.',
    people: 'Charles Babbage, Ada Lovelace.',
    legacy: 'Dio inicio al concepto de programación de computadoras. Dato curioso: El lenguaje Ada® fue nombrado en honor a ella.',
    why: 'Muestra por qué nació la necesidad de crear los sistemas operativos: eliminar la interacción directa y compleja con el hardware.',
    influences: [], descendants: ['gm-naa-io'], source: { label: 'Salgado L. G. (2024), Tanenbaum, A. S. (2003)', href: 'https://keepcoding.io/blog/historia-de-los-primeros-sistemas-operativos/' }, x: 3, y: 50, era: 'mainframes',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'gm-naa-io', name: 'GM-NAA I/O', year: '1956', yearNum: 1956, family: 'IBM', type: 'Batch Processing', color: '#889eb0', size: 'standard',
    tagline: 'Uno de los primeros sistemas operativos de la historia',
    description: 'Desarrollado por Robert L. Patrick y Owen Mock, este sistema operativo fue lanzado para el ordenador IBM 704.\n\nSu misión era simplificar la manera en la que los desarrolladores interactúan con las computadoras.\n\nSu principal función era ejecutar un programa tan pronto como el que se estuviera ejecutando antes finalizara, un proceso que se conoce como Batch Processing.\n\nSi bien para la época fue revolucionario, tenía como desventaja que era totalmente secuencial y esto hacía que fácilmente se pudiera tardar días en acabar con una serie de procesos.',
    context: 'Surgió por la necesidad de automatizar la carga secuencial de tareas en el mainframe IBM 704, evitando la intervención manual permanente entre trabajos.',
    technical: 'Sistema de procesamiento por lotes (Batch Processing) secuencial en cinta magnética para IBM 704.',
    people: 'Robert L. Patrick y Owen Mock.',
    legacy: 'Estableció las bases históricas del procesamiento por lotes en computadoras centrales.',
    why: 'Fue el primer paso para reemplazar la interacción manual humana por un programa supervisor.',
    influences: ['pre-os'], descendants: ['os360', 'multics'], source: { label: 'Salgado L. G. (2024)', href: 'https://keepcoding.io/blog/historia-de-los-primeros-sistemas-operativos/' }, x: 6, y: 80, era: 'mainframes',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'os360', name: 'IBM OS/360', year: '1964', yearNum: 1964, family: 'IBM', type: 'Mainframe', color: '#889eb0', size: 'standard',
    tagline: 'Uno de los primeros OS en usar la multiprogramación',
    description: 'Fue desarrollado por IBM y lanzado para la familia de computadoras IBM System/360.\n\nDado a que el Batch Processing resultaba bastante rudimentario y limitado, este sistema operativo aprovecha los avances en el hardware para la década de 1960, como la aparición de los circuitos integrados, e introduce una nueva función, la multiprogramación.\n\nEsta función es simple, la habilidad de ejecutar múltiples programas simultáneamente en una máquina con un solo procesador.\n\nEl IBM OS/360 cambió por completo la manera en la que los sistemas operativos hacen uso de los recursos a la hora de ejecutar tareas, no obstante, tenía algunos problemas de portabilidad.',
    context: 'Las empresas necesitaban proteger inversiones en hardware e IBM introdujo la multiprogramación con la serie System/360.',
    technical: 'Multiprogramación, circuitos integrados, spooling y gestión avanzada de recursos en una máquina con un solo procesador.',
    people: 'Fred Brooks y el equipo de ingenieros de IBM.',
    legacy: 'Revolucionó el uso de recursos y dio origen a la línea evolutiva de mainframes empresariales.',
    why: 'Cambió por completo la manera en la que los sistemas operativos hacen uso de los recursos al ejecutar tareas.',
    influences: ['gm-naa-io'], descendants: ['vms'], source: { label: 'IBM (2025)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 10, y: 80, era: 'mainframes',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'multics', name: 'MULTICS', year: '1965', yearNum: 1965, family: 'Orígenes', type: 'Sistema de tiempo compartido', color: '#9aafbf', size: 'standard',
    tagline: 'Pionero en tiempo compartido y jerarquía de archivos',
    description: 'MULTICS (Multiplexed Information and Computing Service) comenzó sus primeras discusiones y planificación en el MIT en 1965. Fue concebido como un sistema operativo de tiempo compartido para mainframes capaz de atender simultáneamente a múltiples usuarios con objetivos distintos.',
    context: 'En 1965 iniciaron las discusiones en el MIT, Bell Labs y GE para construir una utilidad computacional permanente.',
    technical: 'Introdujo memoria virtual, anillos de protección, segmentación y la jerarquía de archivos original.',
    people: 'Fernando Corbató, Robert Daley y los equipos de MIT, Bell Labs y GE.',
    legacy: 'Su jerarquía de archivos y estructura de tiempo compartido influyeron directamente en el diseño de UNIX.',
    why: 'Convertir la computación en un servicio compartido multiusuario con jerarquía de archivos nació en MULTICS.',
    influences: ['gm-naa-io'], descendants: ['unix'], source: { label: 'Multicians (2000)', href: 'https://www.multicians.org/history.html' }, x: 11, y: 50, era: 'mainframes',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'unix', name: 'UNIX', year: '1969', yearNum: 1969, family: 'UNIX', type: 'Sistema operativo', color: '#54d9c0', size: 'major',
    tagline: 'Pequeño, componible y escrito para ser entendido',
    description: 'Unix nació en 1969 en Bell Labs como una respuesta deliberadamente ligera. Aunque la jerarquía de archivos comenzó en MULTICS, UNIX la mejoró sustancialmente, convirtiéndola en una característica base fundamental de los sistemas operativos actuales.',
    context: 'Ken Thompson y Dennis Ritchie desarrollaron Unix en un PDP-7/PDP-11 y lo reescribieron en lenguaje C, sentando las bases del software moderno.',
    technical: 'Sistema de archivos jerárquico mejorado, tuberías (pipes), permisos, shell de comandos y abstracción limpia del hardware.',
    people: 'Ken Thompson, Dennis Ritchie, Brian Kernighan y el equipo de Bell Labs.',
    legacy: 'Es el gran ancestro conceptual de macOS, iOS, Android y la familia GNU/Linux.',
    why: 'Estandarizó la jerarquía de archivos y la arquitectura modular en toda la informática.',
    influences: ['multics'], descendants: ['nextstep', 'systemv', 'minix', 'plan9', 'amigaos', 'beos'], source: { label: 'IBM (2025), Ritchie, D. M. (1993), Salgado L. G. (2024)', href: 'https://www.bell-labs.com/usr/dmr/www/chist.html' }, x: 18, y: 50, era: 'unix',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'vms', name: 'VAX/VMS', year: '1977', yearNum: 1977, family: 'DEC', type: 'Sistema propietario', color: '#a292bf', size: 'standard',
    tagline: 'El diseño arquitectónico maestro de Dave Cutler',
    description: 'VMS fue el sistema operativo estrella de DEC para sus computadores VAX. Su arquitectura orientada a la estabilidad y memoria virtual protegida influyó profundamente en los sistemas empresariales.',
    context: 'Digital Equipment Corporation (DEC) diseñó VAX para suceder a sus minicomputadores PDP con enfoque corporativo.',
    technical: 'Sistema de archivos Files-11, memoria virtual con paginación limpia y APIs que inspiraron a Windows NT.',
    people: 'Dave Cutler y el equipo de ingenieros de DEC.',
    legacy: 'Muchas de sus ideas migraron directamente con Dave Cutler cuando Microsoft lo contrató para crear Windows NT.',
    why: 'Representa el puente entre la computación científica institucional y la arquitectura empresarial.',
    influences: ['os360'], descendants: ['windows'], source: { label: 'IBM (2025), Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 30, y: 80, era: 'unix',
    isTrunk: false, themeClass: 'theme-crt-green'
  },
  {
    id: 'msdos', name: 'MS-DOS', year: '1981', yearNum: 1981, family: 'Microsoft', type: 'Sistema de disco', color: '#d99d61', size: 'standard',
    tagline: 'El lenguaje de la primera PC compatible',
    description: 'Microsoft licenció 86-DOS y lo adaptó para IBM. La compatibilidad de hardware dio a MS-DOS una difusión que ningún sistema personal había alcanzado.',
    context: 'Microsoft licenció 86-DOS y lo adaptó para IBM, estableciendo la base del software de computadoras personales.',
    technical: 'Sistema de archivos FAT, intérprete de comandos COMMAND.COM y arquitectura modular básica.',
    people: 'Tim Paterson, Bill Gates, Paul Allen, Microsoft e IBM.',
    legacy: 'Su enorme ecosistema impulsó Windows 3.x, Windows 95 y la informática personal masiva.',
    why: 'Explica cómo la compatibilidad de hardware y la concesión de licencias crearon el mercado de PC.',
    influences: ['gm-naa-io'], descendants: ['windows'], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 37, y: 80, era: 'personal',
    isTrunk: true, themeClass: 'theme-dos-blue'
  },
  {
    id: 'mac-system1', name: 'System 1', year: '1984', yearNum: 1984, family: 'Apple', type: 'Sistema con GUI', color: '#c9a7ed', size: 'standard',
    tagline: 'La interfaz gráfica se democratiza de forma masiva',
    description: 'El sistema operativo clásico de Macintosh introdujo los conceptos de escritorio, ventanas superpuestas, menús desplegables y la papelera de reciclaje al público general.',
    context: 'El equipo de Macintosh diseñó un sistema operativo completamente centrado en la interacción gráfica de usuario.',
    technical: 'Macintosh File System (MFS), gestor de recursos gráficos y multitarea cooperativa básica.',
    people: 'Steve Jobs, Andy Hertzfeld, Bill Atkinson, Susan Kare.',
    legacy: 'Definió la metáfora de escritorio adoptada por los sistemas operativos comerciales contemporáneos.',
    why: 'Cambió para siempre el paradigma: el ordenador personal ya no requería comandos de terminal.',
    influences: ['unix'], descendants: ['nextstep'], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://keepcoding.io/blog/historia-de-los-primeros-sistemas-operativos/' }, x: 42, y: 20, era: 'personal',
    isTrunk: true, themeClass: 'theme-mac-mono'
  },
  {
    id: 'nextstep', name: 'NeXTSTEP', year: '1989', yearNum: 1989, family: 'Apple', type: 'Unix Orientado a Objetos', color: '#b28ecf', size: 'standard',
    tagline: 'El Unix revolucionario y estético de Steve Jobs',
    description: 'NeXTSTEP combinó un microkernel Mach, el entorno BSD, APIs orientadas a objetos en Objective-C y una interfaz extremadamente pulida. Fue la plataforma donde Tim Berners-Lee creó la World Wide Web.',
    context: 'Steve Jobs fundó NeXT Inc. para crear estaciones de trabajo avanzadas; su software se convirtió en el cimiento de Apple a su regreso.',
    technical: 'Microkernel Mach con subsistema BSD, Display PostScript y frameworks de desarrollo orientados a objetos.',
    people: 'Steve Jobs, Avie Tevanian y el equipo de NeXT.',
    legacy: 'Cuando Apple compró NeXT en 1996, NeXTSTEP se convirtió en la base directa sobre la que se construyó Mac OS X (Darwin).',
    why: 'Demostró que un núcleo Unix robusto e industrial podía integrarse perfectamente con un entorno guiado por objetos.',
    influences: ['unix', 'mac-system1'], descendants: ['darwin'], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 55, y: 20, era: 'open',
    isTrunk: true, themeClass: 'theme-aqua'
  },
  {
    id: 'gnu-hurd', name: 'GNU Hurd', year: '1990', yearNum: 1990, family: 'UNIX', type: 'Microkernel de investigación', color: '#54d9c0', size: 'standard',
    tagline: 'La visión pura del microkernel libre del proyecto GNU',
    description: 'Diseñado por la Free Software Foundation para servir de núcleo nativo del sistema operativo GNU mediante servidores cooperativos descentralizados.',
    context: 'Iniciado para completar el sistema libre GNU bajo un diseño vanguardista de microkernel.',
    technical: 'Colección de servidores (traductores) sobre el microkernel GNU Mach con interfaz POSIX.',
    people: 'Richard Stallman, Thomas Bushnell, Roland McGrath.',
    legacy: 'Su desarrollo complejo dio espacio para que Linux fuera adoptado masivamente como kernel del sistema GNU.',
    why: 'Muestra que el diseño ambicioso a veces choca con la velocidad práctica de adopción.',
    influences: ['unix'], descendants: [], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 48, y: 62, era: 'unix',
    isTrunk: false, themeClass: 'theme-crt-green'
  },
  {
    id: 'minix', name: 'MINIX', year: '1987', yearNum: 1987, family: 'UNIX', type: 'Microkernel educativo', color: '#54d9c0', size: 'standard',
    tagline: 'Aprender sistemas operativos construyéndolos',
    description: 'MINIX fue diseñado en 1987 por Andrew S. Tanenbaum para enseñar la arquitectura de un sistema operativo moderno con código limpio e inteligible.',
    context: 'Andrew S. Tanenbaum creó MINIX como un Unix de código accesible para cursos universitarios.',
    technical: 'Arquitectura de microkernel, servidores en espacio de usuario y paso explícito de mensajes.',
    people: 'Andrew S. Tanenbaum.',
    legacy: 'Sirvió como entorno de aprendizaje directo e inspiración para que Linus Torvalds escribiera Linux.',
    why: 'Enseña que la arquitectura de sistemas es también una decisión pedagógica y conceptual.',
    influences: ['unix'], descendants: ['linux'], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://keepcoding.io/blog/historia-de-los-primeros-sistemas-operativos/' }, x: 48, y: 38, era: 'unix',
    isTrunk: true, themeClass: 'theme-crt-green'
  },
  {
    id: 'linux', name: 'Linux', year: '1991', yearNum: 1991, family: 'Linux', type: 'Kernel', color: '#f4bf5f', size: 'major',
    tagline: 'Un kernel personal que se volvió infraestructura mundial',
    description: 'Linux comenzó en 1991 como un proyecto personal de Linus Torvalds en Helsinki y se convirtió en el núcleo universal sobre el cual se construyen sistemas comunitarios, comerciales y en la nube.',
    context: 'Torvalds buscaba aprender sobre la arquitectura 80386 y publicó el código libremente para recibir colaboraciones.',
    technical: 'Kernel monolítico modular, multitarea preventiva, memoria virtual, controladores y licencia GPL.',
    people: 'Linus Torvalds, Andrew S. Tanenbaum, Richard Stallman y la comunidad global.',
    legacy: 'Impulsa servidores, supercomputadores, contenedores, Android y la infraestructura cloud.',
    why: 'Convertió la colaboración distribuida y el software libre en infraestructura confiable a escala planetaria.',
    influences: ['minix'], descendants: ['debian', 'redhat', 'android', 'cloud', 'symbian'], source: { label: 'Tanenbaum, A. S. (2003), Salgado L. G. (2024)', href: 'https://keepcoding.io/blog/historia-de-los-primeros-sistemas-operativos/' }, x: 60, y: 50, era: 'open',
    isTrunk: true, themeClass: 'theme-tux'
  },
  {
    id: 'windows', name: 'Windows NT', year: '1993', yearNum: 1993, family: 'Microsoft', type: 'Sistema operativo', color: '#d99d61', size: 'major',
    tagline: 'La rama profesional que terminó unificando Windows',
    description: 'Windows NT separó a Microsoft de las limitaciones de MS-DOS con un diseño moderno, portable y protegido. Su arquitectura se convirtió en la base de Windows 2000, XP y la línea contemporánea.',
    context: 'Microsoft necesitaba una plataforma robusta para estaciones de trabajo y servidores.',
    technical: 'Kernel híbrido, memoria protegida, capa de abstracción de hardware (HAL) y soporte multiprocesador.',
    people: 'Dave Cutler y el equipo de ingeniería de Microsoft.',
    legacy: 'Tronco principal de Windows de escritorio, servidores y desarrollo desde Windows XP.',
    why: 'Muestra cómo un sistema popular reinventó su interior técnico manteniendo la compatibilidad.',
    influences: ['vms', 'msdos'], descendants: [], source: { label: 'IBM (2025), Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 68, y: 80, era: 'open',
    isTrunk: true, themeClass: 'theme-win95'
  },
  {
    id: 'darwin', name: 'Darwin / macOS', year: '2001', yearNum: 2001, family: 'Apple', type: 'Sistema operativo', color: '#c9a7ed', size: 'standard',
    tagline: 'Unix debajo de una experiencia personal cuidadosamente diseñada',
    description: 'Mac OS X unió la interfaz gráfica de Apple con Darwin, una base abierta basada en el núcleo XNU (Mach + componentes BSD) heredada de NeXTSTEP.',
    context: 'Apple obtuvo la base técnica para renovar Mac OS clásico sin perder el diseño distintivo.',
    technical: 'XNU (Mach + BSD), memoria protegida, multitarea preventiva y entorno gráfico Aqua.',
    people: 'Steve Jobs, Avie Tevanian y equipos de Apple.',
    legacy: 'Darwin es el cimiento de macOS, iOS, iPadOS, watchOS y tvOS.',
    why: 'Demuestra cómo integrar la solidez Unix dentro de una interfaz humana refinada.',
    influences: ['nextstep'], descendants: ['ios'], source: { label: 'Tanenbaum, A. S. (2003), IBM (2025)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 75, y: 20, era: 'open',
    isTrunk: true, themeClass: 'theme-aqua'
  },
  {
    id: 'debian', name: 'Debian', year: '1993', yearNum: 1993, family: 'Linux', type: 'Distribución', color: '#f4bf5f', size: 'standard',
    tagline: 'Una comunidad y un contrato social alrededor de Linux',
    description: 'Debian organizó el kernel Linux y las herramientas GNU en una distribución 100% comunitaria, regida por su Manifiesto y Contrato Social.',
    context: 'Ian Murdock propuso un proyecto abierto independiente de empresas comerciales.',
    technical: 'Paquetes .deb, gestor de paquetes APT y estrictas políticas de control de calidad.',
    people: 'Ian Murdock, Fernández-Sanguino, J. et al., comunidad Debian.',
    legacy: 'Origen directo de Ubuntu, Linux Mint y decenas de distribuciones derivadas.',
    why: 'Demuestra que la gobernanza social y los acuerdos éticos importan tanto como el código del kernel.',
    influences: ['linux'], descendants: ['ubuntu'], source: { label: 'Fernández-Sanguino, J., et al. (1999)', href: 'https://www.debian.org/doc/manuals/project-history/' }, x: 70, y: 38, era: 'open',
    isTrunk: true, themeClass: 'theme-tux'
  },
  {
    id: 'redhat', name: 'Red Hat', year: '1994', yearNum: 1994, family: 'Linux', type: 'Distribución empresarial', color: '#f4bf5f', size: 'standard',
    tagline: 'Linux encontró un modelo para el mundo empresarial',
    description: 'Red Hat convirtió Linux en una plataforma comercial con soporte, certificaciones y ciclo de vida profesional para centros de datos.',
    context: 'Empresas e instituciones requerían soporte técnico y estabilidad garantizada para ejecutar Linux.',
    technical: 'Sistema RPM, SELinux, utilidades administrativas y contribución activa al kernel.',
    people: 'Marc Ewing, Bob Young y la comunidad Fedora / RHEL.',
    legacy: 'RHEL lidera en centros de datos, nube híbrida y entornos de contenedores.',
    why: 'Demostró la viabilidad comercial y profesional del software de código abierto.',
    influences: ['linux'], descendants: [], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 70, y: 62, era: 'open',
    isTrunk: false, themeClass: 'theme-tux'
  },
  {
    id: 'ubuntu', name: 'Ubuntu', year: '2004', yearNum: 2004, family: 'Linux', type: 'Distribución', color: '#f4bf5f', size: 'standard',
    tagline: 'Hacer que Linux fuera una puerta de entrada',
    description: 'Ubuntu partió de Debian en 2004 con el propósito de ofrecer lanzamientos regulares, instalación sencilla y soporte accesible para usuarios finales y servidores.',
    context: 'Canonical identificó la necesidad de una distribución Linux amigable y fácil de mantener.',
    technical: 'Gestión APT, lanzamientos periódicos cada 6 meses, versiones LTS y entorno GNOME.',
    people: 'Mark Shuttleworth, Canonical y la comunidad Ubuntu.',
    legacy: 'Una de las distribuciones más populares en escritorios, servidores, desarrollo y cloud.',
    why: 'Acercó la tecnología Linux a millones de personas sin requerir experiencia en terminal.',
    influences: ['debian'], descendants: [], source: { label: 'Canonical Ubuntu (2010)', href: 'https://ubuntu.com/about' }, x: 82, y: 38, era: 'open',
    isTrunk: true, themeClass: 'theme-tux'
  },
  {
    id: 'symbian', name: 'Symbian OS', year: '1997', yearNum: 1997, family: 'Móvil', type: 'SO para Smartphones', color: '#7ed6a7', size: 'standard',
    tagline: 'El pionero absoluto de los teléfonos móviles inteligentes',
    description: 'Symbian dominó el mercado de smartphones en los años 2000, destacando por su extrema eficiencia de memoria en teléfonos Nokia.',
    context: 'El consorcio Symbian (Nokia, Ericsson, Motorola) creó la plataforma móvil pionera.',
    technical: 'Arquitectura microkernel orientada a objetos y gestión estricta de energía y memoria.',
    people: 'Nokia, Ericsson y el consorcio Symbian.',
    legacy: 'Estableció las bases operativas de las redes y comunicaciones móviles.',
    why: 'Enseña cómo la evolución de interfaces táctiles capacita el reemplazo de plataformas consolidadas.',
    influences: ['linux'], descendants: [], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 76, y: 66, era: 'open',
    isTrunk: false, themeClass: 'theme-mobile'
  },
  {
    id: 'android', name: 'Android', year: '2008', yearNum: 2008, family: 'Móvil', type: 'Plataforma móvil', color: '#7ed6a7', size: 'major',
    tagline: 'El kernel Linux salió del servidor y entró en el bolsillo',
    description: 'Android utiliza el kernel Linux como cimiento para una plataforma móvil abierta con runtime, marco de aplicaciones e integración de hardware.',
    context: 'Google y la Open Handset Alliance crearon una plataforma abierta adaptada a dispositivos táctiles.',
    technical: 'Kernel Linux modificado, comunicación IPC Binder, aislamiento por aplicación y runtime Android.',
    people: 'Andy Rubin, Google y la Open Handset Alliance.',
    legacy: 'Sistema operativo líder global en número de dispositivos móviles activos.',
    why: 'Demuestra cómo el kernel Linux sostiene aplicaciones táctiles a escala planetaria.',
    influences: ['linux'], descendants: [], source: { label: 'Tanenbaum, A. S. (2003), IBM (2025)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 88, y: 62, era: 'mobile',
    isTrunk: true, themeClass: 'theme-mobile'
  },
  {
    id: 'ios', name: 'iOS', year: '2007', yearNum: 2007, family: 'Móvil', type: 'Sistema móvil', color: '#7ed6a7', size: 'major',
    tagline: 'Darwin y macOS reinterpretados para una pantalla táctil',
    description: 'iOS comparte la base Darwin/macOS con el sistema de escritorio de Apple, pero organiza su experiencia alrededor de interfaces táctiles capacitivas y la gestión de energía.',
    context: 'El iPhone exigió adaptar tecnologías de escritorio a un dispositivo móvil cerrado y gestual.',
    technical: 'Núcleo XNU derivado de Darwin/macOS, sandboxing, aceleración por hardware y firma de código.',
    people: 'Steve Jobs, Scott Forstall y equipos de Apple.',
    legacy: 'Consolidó el estándar de las plataformas móviles táctiles modernas.',
    why: 'Explica cómo adaptar un sistema operativo de escritorio Unix a dispositivos portátiles.',
    influences: ['darwin'], descendants: [], source: { label: 'Tanenbaum, A. S. (2003), IBM (2025)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 88, y: 20, era: 'mobile',
    isTrunk: true, themeClass: 'theme-mobile'
  },
  {
    id: 'cloud', name: 'Linux en la nube', year: '2010 →', yearNum: 2010, family: 'Linux', type: 'Infraestructura', color: '#f4bf5f', size: 'major',
    tagline: 'El sistema operativo invisible de la infraestructura',
    description: 'En la nube, Linux se convirtió en el sustrato universal para máquinas virtuales, contenedores Docker, Kubernetes y la web global.',
    context: 'Los centros de datos masivos requerían un sistema flexible, automatizable y de código abierto.',
    technical: 'Namespaces, cgroups, virtualización KVM, eBPF y redes programables.',
    people: 'Comunidades del kernel Linux, desarrolladores de infraestructura y empresas cloud.',
    legacy: 'Sostiene la mayor parte de las aplicaciones, servidores y la Web en la actualidad.',
    why: 'La historia culmina en un sistema operativo transparente que administra la infraestructura mundial.',
    influences: ['linux'], descendants: [], source: { label: 'IBM (2025), Salgado L. G. (2024)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 95, y: 50, era: 'cloud',
    isTrunk: true, themeClass: 'theme-cloud'
  },
  {
    id: 'amigaos', name: 'AmigaOS', year: '1985', yearNum: 1985, family: 'Personal', type: 'Sistema multimedia', color: '#d99d61', size: 'standard',
    tagline: 'Multitarea gráfica cuando el escritorio aún estaba naciendo',
    description: 'AmigaOS combinó multitarea preventiva, entorno gráfico y coprocesadores de hardware dedicados en una máquina personal avanzada.',
    context: 'Commodore lanzó el Amiga orientándolo al desarrollo multimedia y creativo.',
    technical: 'Núcleo Exec multitarea, librerías compartidas e interfaz Intuition.',
    people: 'Jay Miner, RJ Mical, Dave Needle.',
    legacy: 'Inspiró a comunidades multimedia e influenció el diseño gráfico posterior.',
    why: 'Muestra los avances pioneros en computación multimedia personal.',
    influences: ['unix'], descendants: [], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://keepcoding.io/blog/historia-de-los-primeros-sistemas-operativos/' }, x: 46, y: 92, era: 'personal',
    isTrunk: false, themeClass: 'theme-mac-mono'
  },
  {
    id: 'beos', name: 'BeOS', year: '1995', yearNum: 1995, family: 'Personal', type: 'Sistema multimedia', color: '#d99d61', size: 'standard',
    tagline: 'Diseñado desde cero para medios y paralelismo',
    description: 'BeOS apostó por un sistema de archivos con metadatos, soporte multihilo nativo y multiprocesamiento para edición multimedia.',
    context: 'Be Inc. buscó superar los cuellos de botella de los sistemas de escritorio tradicionales.',
    technical: 'Kernel multihilo multiprocesador y sistema de archivos BFS.',
    people: 'Jean-Louis Gassée y el equipo de Be Inc.',
    legacy: 'Inspiró la creación del proyecto de software libre Haiku OS.',
    why: 'Demuestra cómo la arquitectura multihilo revolucionó el procesamiento multimedia.',
    influences: ['unix'], descendants: [], source: { label: 'Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 72, y: 92, era: 'open',
    isTrunk: false, themeClass: 'theme-aqua'
  },
  {
    id: 'systemv', name: 'System V', year: '1983', yearNum: 1983, family: 'UNIX', type: 'Unix comercial', color: '#54d9c0', size: 'standard',
    tagline: 'La estandarización comercial de la familia Unix',
    description: 'System V de AT&T consolidó la rama comercial de Unix, introduciendo mecanismos estándar de IPC y memoria compartida.',
    context: 'AT&T buscaba estandarizar una versión comercial unificada de Unix.',
    technical: 'IPC (System V IPC), colas de mensajes, semáforos y memoria compartida.',
    people: 'AT&T Unix Support Group.',
    legacy: 'Base de estándares POSIX y de variantes comerciales como Solaris e IBM AIX.',
    why: 'Marcó un hito en la estandarización industrial de las APIs de sistemas de archivos y procesos.',
    influences: ['unix'], descendants: ['solaris'], source: { label: 'IBM (2025), Ritchie, D. M. (1993)', href: 'https://www.bell-labs.com/usr/dmr/www/chist.html' }, x: 34, y: 34, era: 'unix',
    isTrunk: false, themeClass: 'theme-crt-green'
  },
  {
    id: 'os2', name: 'OS/2', year: '1987', yearNum: 1987, family: 'IBM', type: 'Sistema de escritorio', color: '#889eb0', size: 'standard',
    tagline: 'La alianza PC que buscó una base más protegida',
    description: 'Desarrollado inicialmente por IBM y Microsoft para superar las limitaciones de memoria de DOS en computadoras PC compatibles.',
    context: 'Diseñado para aportar multitarea preventiva y protección de memoria al PC de escritorio.',
    technical: 'Multitarea preventiva, modo protegido de 16/32 bits y Presentation Manager.',
    people: 'Equipos de desarrollo de IBM y Microsoft.',
    legacy: 'Utilizado en cajeros automáticos e infraestructura bancaria durante décadas.',
    why: 'Refleja la transición de los entornos personales de 16 bits hacia esquemas protegidos de 32 bits.',
    influences: ['os360'], descendants: [], source: { label: 'IBM (2025)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 51, y: 92, era: 'personal',
    isTrunk: false, themeClass: 'theme-win95'
  },
  {
    id: 'aix', name: 'AIX', year: '1986', yearNum: 1986, family: 'IBM', type: 'Unix empresarial', color: '#889eb0', size: 'standard',
    tagline: 'Unix optimizado para la ingeniería empresarial de IBM',
    description: 'AIX es la variante de Unix desarrollada por IBM para sus potentes arquitecturas de servidores de misión crítica.',
    context: 'IBM requería un entorno Unix de alto rendimiento para sus procesadores POWER.',
    technical: 'Sistema de archivos JFS, volumen LVM y capacidades de virtualización avanzada.',
    people: 'IBM Software and Engineering teams.',
    legacy: 'Sigue vigente en servidores corporativos e instalaciones bancarias globales.',
    why: 'Ilustra cómo Unix se adaptó a mainframes y servidores de alta disponibilidad.',
    influences: ['unix'], descendants: [], source: { label: 'IBM (2025)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 44, y: 8, era: 'open',
    isTrunk: false, themeClass: 'theme-tux'
  },
  {
    id: 'solaris', name: 'Solaris', year: '1992', yearNum: 1992, family: 'Solaris', type: 'Unix empresarial', color: '#78c8c2', size: 'standard',
    tagline: 'Observabilidad y escala para servidores SPARC',
    description: 'Solaris de Sun Microsystems convirtió a Unix en el rey de los servidores de Internet temprana con énfasis en escalabilidad y almacenamiento.',
    context: 'Diseñado para impulsar la Web en servidores SPARC multi-procesador.',
    technical: 'Sistema de archivos ZFS, contenedores Solaris Zones y herramienta de trazado DTrace.',
    people: 'Sun Microsystems, Bill Joy y el equipo de Solaris.',
    legacy: 'Sus aportes de observabilidad (DTrace) y almacenamiento (ZFS) perduran en la industria.',
    why: 'Estableció el estándar de confiabilidad y diagnóstico en servidores empresariales.',
    influences: ['systemv'], descendants: [], source: { label: 'IBM (2025), Tanenbaum, A. S. (2003)', href: 'https://www.ibm.com/think/topics/operating-systems' }, x: 54, y: 8, era: 'open',
    isTrunk: false, themeClass: 'theme-tux'
  },
  {
    id: 'plan9', name: 'Plan 9', year: '1992', yearNum: 1992, family: 'Plan 9', type: 'Sistema de investigación', color: '#78c8c2', size: 'standard',
    tagline: 'La investigación de Bell Labs después de Unix',
    description: 'Plan 9 exploró una arquitectura distribuida donde todos los recursos (red, procesos, pantallas) se representan unificadamente como archivos.',
    context: 'El equipo original de Bell Labs buscó evolucionar los conceptos de Unix hacia redes distribuidas.',
    technical: 'Protocolo 9P, per-process namespaces y sistema de archivos virtual /net.',
    people: 'Rob Pike, Ken Thompson, Dave Presotto y el equipo de Bell Labs.',
    legacy: 'Sus namespaces inspiraron los contenedores modernos de Linux (Docker/Kubernetes).',
    why: 'Demostró el poder del concepto de espacio de nombres (namespaces) para la virtualización.',
    influences: ['unix'], descendants: [], source: { label: 'Ritchie, D. M. (1993), IBM (2025)', href: 'https://www.bell-labs.com/usr/dmr/www/chist.html' }, x: 56, y: 34, era: 'unix',
    isTrunk: false, themeClass: 'theme-crt-green'
  }
];

const nodeIds = new Set(historyNodes.map((node) => node.id));

export const connections = historyNodes.flatMap((node) =>
  node.descendants
    .filter((target) => nodeIds.has(target))
    .map((target) => ({ from: node.id, to: target }))
);

export const families = ['Todos', 'Linux', 'UNIX', 'Microsoft', 'Apple', 'Móvil', 'Orígenes', 'IBM', 'Personal', 'Solaris', 'Plan 9', 'DEC'] as const;
export const routeLinuxIds = ['pre-os', 'gm-naa-io', 'unix', 'minix', 'linux', 'debian', 'ubuntu', 'cloud'];

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
    title: "The story of Ubuntu",
    author: "Canonical Ubuntu",
    year: "2010 (14 de septiembre)",
    category: "Sitio Web",
    description: "Historia oficial y visión del proyecto Ubuntu sobre el desarrollo de software libre accesible para todos.",
    url: "https://ubuntu.com/about"
  },
  {
    title: "Una breve historia de Debian (Versión 13.7)",
    author: "Fernández-Sanguino, J., Garbee, B., Koptein, H., Lohner, N., Lowe, W., Mitchell, B., Murdock, I., Schulze, M. & Small, C.",
    year: "1999",
    category: "Libro",
    description: "Documentación oficial del proyecto Debian que repasa el nacimiento del Manifiesto Debian y la evolución del sistema.",
    url: "https://www.debian.org/doc/manuals/project-history/"
  },
  {
    title: "What is an operating system?",
    author: "IBM",
    year: "2025 (24 de mayo)",
    category: "Sitio Web",
    description: "Artículo explicativo sobre la definición fundamental, recursos, arquitectura y gestión de un sistema operativo.",
    url: "https://www.ibm.com/think/topics/operating-systems"
  },
  {
    title: "Multics history",
    author: "Multicians",
    year: "2000 (22 de abril)",
    category: "Sitio Web",
    description: "Repositorio histórico oficial dedicado al desarrollo de MULTICS y sus aportes conceptuales.",
    url: "https://www.multicians.org/history.html"
  },
  {
    title: "The development of the C language",
    author: "Ritchie, D. M.",
    year: "1993",
    category: "Artículo Histórico",
    description: "Ponencia histórica sobre el desarrollo de C y el trasfondo técnico en Bell Labs para la creación de UNIX.",
    url: "https://www.bell-labs.com/usr/dmr/www/chist.html"
  },
  {
    title: "Historia y evolución de los primeros sistemas operativos",
    author: "Salgado L. G.",
    year: "2024 (14 de octubre)",
    category: "Artículo Histórico",
    description: "Revisión histórica de las primeras fases de la computación, desde el lenguaje máquina directo hasta los primeros sistemas de procesamiento por lotes.",
    url: "https://keepcoding.io/blog/historia-de-los-primeros-sistemas-operativos/"
  },
  {
    title: "Sistemas operativos modernos (Segunda edición)",
    author: "Tanenbaum, A. S.",
    year: "2003",
    category: "Libro",
    description: "Texto académico de referencia sobre la arquitectura, funcionamiento interno y evolución histórica de los sistemas operativos modernos."
  }
];