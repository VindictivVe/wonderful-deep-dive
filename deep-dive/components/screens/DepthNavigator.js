import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from "react-native";
import shortid from "shortid";

import { Gyroscope, Accelerometer } from "expo-sensors";

import { ListItem1 } from "../listItems/ListItem1";
import { ListItem2 } from "../listItems/ListItem2";
import { ListItem3 } from "../listItems/ListItem3";
import { ListItem4 } from "../listItems/ListItem4";
import { ListItem5 } from "../listItems/ListItem5";

const DepthNavigator = () => {
  const [currentOffsetX, setCurrentOffsetX] = useState(0);
  const { height, width } = useWindowDimensions();
  const [ref, setRef] = useState(null);
  const [changable, setChangable] = useState(true);
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true);

  const [gyroData, setGyroData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [gyroSubscription, setGyroSubscription] = useState(null);

  const _gyroSlow = () => {
    Gyroscope.setUpdateInterval(100);
  };

  const _gyroSubscribe = () => {
    _gyroSlow();
    setGyroSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setGyroData(gyroscopeData);
      })
    );
    _gyroSlow();
  };

  const _gyroUnsubscribe = () => {
    gyroSubscription && gyroSubscription.remove();
    setGyroData(null);
  };

  const [accData, setAccData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [accSubscription, setAccSubscription] = useState(null);

  const _accSlow = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _accSubscribe = () => {
    _accSlow();
    setAccSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setAccData(accelerometerData);
      })
    );
    _accSlow();
  };

  const _accUnsubscribe = () => {
    accSubscription && accSubscription.remove();
    setAccData(null);
  };

  useEffect(() => {
    _gyroSubscribe();
    setGyroData({ x: 0, y: 0, z: 0 });
    _accSubscribe();
    setAccData({ x: 0, y: 0, z: 0 });
    return () => {
      _gyroUnsubscribe();
      _accUnsubscribe();
    };
  }, []);

  const [data, setData] = useState([
    {
      id: shortid.generate(),
      title: "Wussten Sie das?",
      text1: "Die epipelagiale Schicht (gr. pélagos (offene See) und epí (auf)) reicht von der Wasseroberfläche bis in eine Tiefe von 200m. Es gibt viel Licht und Wärme in dieser Schicht, obwohl beide mit zunehmender Tiefe abnehmen. Der Druck ist ebenfalls minimal und steigt mit der Tiefe.",
      text2: "An das Epipelagial schließt sich das Mesopelagial an, das bis in etwa 1000 Meter Tiefe hinunterreicht (gr. mésos = Mitte). Die Biodichte ist hier geringer als die der darüber liegenden epipelagischen Zone, da das Eindringen von Licht in die unteren Regionen dieser Zone schnell abfällt. Schwache Sonnenstrahlen durchdringen die Schicht. Wer bis zum Ende dieser Zone vordringen möchte, kann das nur noch mit einem Tauchfahrzeug, denn der Wasserdruck ist dort längst zu hoch für den menschlichen Körper.",
      text3: "Die daran anschließende Zone zwischen 1000 und 4000 Metern bezeichnet man als Bathypelagial (gr. bathýs = tief). Diese Schicht wird auch als Mitternachts- oder Dunkelzone bezeichnet. In diese Tiefe gelangt sehr wenig Licht, weshalb hier keine lebenden Pflanzen zu finden sind.",
      text4: "Es folgt das Abyssopelagial, das zwischen 4000 und 6000 Meter Tiefe liegt (gr. ábyssos = bodenlos). Genau wie in der darunter liegenden Schicht sind die Temperaturen in der Nähe von Gefrierpunkt und es gibt kein Eindringen von natürlichem Licht.",
      text5: "Die tiefsten Meeresregionen bezeichnet man als Hadopelagial (gr. ades = Unterwelt). Diese Zone reicht hinab bis in die Tiefseegräben, bis in etwa 11 000 Meter Tiefe. Natürliches Licht kann nicht in die Gräben eindringen. Der Grund der Ozeane ist in der Regel mit einer Schicht organischen Drecks gefüllt, der ein paar Zentimeter tief ist, wie ein Waldboden.",
    },
    {
      id: shortid.generate(),
      title: "Lebewesen",
      text1: "Diese oberste, vom Licht beeinflusste Schicht ist besonders produktiv, da hier die Primärproduzenten (Algen, Cyanobakterien und Seegras) durch die Photosynthese Biomasse aufbauen. Diese Primärproduktion ist Basis des Lebens im Meer. Hier tummeln sich die meisten bekannten Meeresbewohner, so wie viele der Fische, die wir essen, und die Korallenriffe, die unsere Schiffe überraschen",
      text2: "Während im oberen Bereich dieser Zone noch Plankton und Korallen zu finden sind, leben im unteren Bereich schon Tiefsee-Beilfische. In der Zone leben einige der seltsamsten Meerestiere wie der Schwertfisch und der Wolfsaal.",
      text3: "In dieser Zone leben viele Tiefseearten – Fische, Krebse oder auch Schnecken. Riesen- und Kolossalkalmare sind hier ebenso zu finden wie Pottwale. Die Tiere, die dort leben, haben ausgeprägte Sinne und raffinierte Strategien, um Beute zu machen. Oft haben Sie ein bizarres Aussehen. Zu ihnen zählen Angler-, Viper-, und Fangzahnfische. ",
      text4: "Hier leben Grundnahrungsmittel, von denen viele schaufelförmige Kiefer haben, um Ablagerungen vom Meeresboden zu heben. Wirbellose wie Seesterne und Tintenfische können in dieser Umgebung überleben.",
      text5: "Forscher gehen davon aus, dass es in dieser Zone massenhaft unentdeckte Arten gibt. Bekannt ist dagegen schon der Borstenwurm, der es dort mit dem ungeheuren Druck und Temperaturen nahe dem Gefrierpunkt aufnimmt. Verschiedene Kreaturen können in dieser Schicht gefunden werden, hauptsächlich Wirbellose einschließlich Seesternen.",
    },
    {
      id: shortid.generate(),
      title: "Verschmutzung",
      text1: "Bedroht werden diese Arten u.a. durch herabsinkendes Mikroplastik, welches die Meerestiere mit Nahrung verwechseln und fressen. Schätzungen zufolge landen jährlich zwischen 4,8 und 12,7 Millionen Tonnen Plastikmüll in den Ozeanen.",
      text2: "Auch hier sind die Tiere durch Plastik bedroht. So haben Forscher*innen bei 73% der untersuchten Fische im Nordatlantik Plastik im Bauch nachgewiesen.",
      text3: "Während nur ein kleiner Teil an der Oberfläche schwimmt, sinkt der Großteil in Form von Mikroplastik in die tieferen Meeresschichten. Hier finden sich neben Mikroplastik noch größere Plastikteile.",
      text4: "Es finden sich neben Mikroplastik noch größere Plastikteile.",
      text5: "Selbst in dieser Tiefe, im Marianengraben, haben Meeresforscher*innen noch eine Plastiktüte entdeckt.",
    },
    {
      id: shortid.generate(),
      title: "Klimawandel",
      text1: "Die extrem artenreichen Öko-Systeme sind auch durch die wärmeren Temperaturen bedroht. Wissenschaftler gehen davon aus, dass nur rund die Hälfte aller Korallenriffe erhalten bleibt, wenn wir den Temperaturanstieg auf derzeit unrealistische 1,2 Grad Celsius beschränken.  ",
      text2: "Meere nehmen große Mengen Kohlendioxid auf. Laut dem Helmholtz-Zentrum für Polar- und Meeresforschung haben sie mehr als ein Viertel des vom Menschen verursachten atmosphärischen Kohlendioxids aufgenommen. Für sie hat das fatale Folgen. Denn: Seit Beginn der industriellen Revolution sind die Meere um fast 30 Prozent saurer geworden, weil die Aufnahme des Kohlendioxids den pH-Wert der Meere senkt. Die Folgen der Versauerung reichen von Leiden der Wasserlebewesen bis hin zu fatalen Auswirkungen für die Menschen.",
      text3: "Die Versauerung der Meere hat nicht nur Auswirkungen auf die Unterwasserwelt. Sie wirkt sich auch auf die Fähigkeit des Ozeans aus, Kohlenstoff zu speichern. Heißt: Je mehr Kohlendioxid die Meere aufnehmen, desto saurer werden sie, und je saurer sie werden, desto weniger Kohlendioxid können sie aufnehmen. Ihre so wichtige Funktion für die Begrenzung der Klimakrise ist damit also gefährdet.",
      text4: "Die Versauerung der Meere schreitet überall voran – besonders schnell in den Polarregionen. Dort könnte es, so das Helmholtz-Zentrum für Polar- und Meeresforschung, bereits Mitte dieses Jahrhunderts dazu führen, dass zu wenig Aragonit vorhanden ist. Nie gehört? Aragonit ist ein wichtiger Bestandteil von Kalkschalen. Unter einem Mangel leiden also vor allem etwa Muscheln, Seesterne und Korallen – und die oben angesprochenen Korallenriffe",
      text5: "Für die Versauerung der Meere gibt es nur einen Therapieansatz: Wir müssen unseren Kohlendioxidausstoß reduzieren. Die 'Therapie' ist allerdings eher langfristig angelegt. Das Alfred-Wegener-Institut rechnet damit, dass die Ozeane Tausende von Jahren bräuchten, sich zu erholen – selbst wenn wir es schaffen würden, den CO2-Ausstoß von heute auf morgen auf null zu reduzieren. Die Versauerung ist nicht das einzige große Problem der Meere. Sie sind außerdem zu warm, verdreckt, ausgeraubt und leer gefischt.",
    },
    {
      id: shortid.generate(),
      title: "Weitere Probleme",
      text1: "Meeresverschmutzungen tragen zu einem verstärkten Eutrophierungsprozess bei. Die Anreicherung von Nährstoffen verursacht eine Massenvermehrung von Algen- und Cyanobakterien. Obwohl die Schichten infolge der Fotosynthese des Phytoplanktons zunächst mit Sauerstoff angereichert werden nach dem Absterben der Algen werden diese durch Bakterien abgebaut, was viel Sauerstoff benötigt, sodass die Sauerstoffkonzentration des Sees rasch absinkt.",
      text2: "Eine starke Bedrohung der im Meer lebenden Organismen geht von anthropogenen Stoffeinträgen aus. Die Verschmutzung der Meere durch Schadstoffe wird zu mehr als 80 % durch Aktivitäten auf dem Festland verursacht. Durch Flüsse gelangen Halogenverbindungen, Öle, Schwermetalle und Nährstoffe in die Meere und gefährden insbesondere die Lebensgemeinschaften der Küstenregionen und die an den Küsten lebenden Menschen.",
      text3: "Zusätzlich zu der oben genannten Eutrophierung werden bei Fäulnisprozessen die verbliebenen Sauerstoffreste verbraucht, sodass eine Faulschlammschicht entsteht. Als Stoffwechselprodukte entstehen toxische Kohlenwasserstoffe, z.B. Methan. Dadurch sterben Fische, Krebse und Schnecken an Sauerstoffmangel.",
      text4: "Das Endstadium der Eutrophierung ist der Extremfall: Das so genannte „Umkippen“ des Sees, in dem der See biologisch tot ist. Meist tritt dieser Fall jedoch nicht ein, sondern es stellt sich ein biologisches Gleichgewicht ein. Den Grad der Eutrophierung kann man u.a. an der Häufigkeit bestimmter Fischarten erkennen.",
      text5: "Während sich die natürliche Eutrophierung von Seen in Zeiträumen von Tausenden Jahren vollzieht, läuft die E. durch anthropogene Einflüsse in nur wenigen Jahrzehnten ab. Längerfristig lässt sich die E. nur durch eine starke Beschränkung der Nährstoffzufuhr, z.B. durch eine Nährstoffentfernung aus Abwässern, vermindern.",
    },
    {
      id: shortid.generate(),
      title: "Wussten Sie das?",
      text1: "Die epipelagiale Schicht (gr. pélagos (offene See) und epí (auf)) reicht von der Wasseroberfläche bis in eine Tiefe von 200m. Es gibt viel Licht und Wärme in dieser Schicht, obwohl beide mit zunehmender Tiefe abnehmen. Der Druck ist ebenfalls minimal und steigt mit der Tiefe.",
      text2: "An das Epipelagial schließt sich das Mesopelagial an, das bis in etwa 1000 Meter Tiefe hinunterreicht (gr. mésos = Mitte). Die Biodichte ist hier geringer als die der darüber liegenden epipelagischen Zone, da das Eindringen von Licht in die unteren Regionen dieser Zone schnell abfällt. Schwache Sonnenstrahlen durchdringen die Schicht. Wer bis zum Ende dieser Zone vordringen möchte, kann das nur noch mit einem Tauchfahrzeug, denn der Wasserdruck ist dort längst zu hoch für den menschlichen Körper.",
      text3: "Die daran anschließende Zone zwischen 1000 und 4000 Metern bezeichnet man als Bathypelagial (gr. bathýs = tief). Diese Schicht wird auch als Mitternachts- oder Dunkelzone bezeichnet. In diese Tiefe gelangt sehr wenig Licht, weshalb hier keine lebenden Pflanzen zu finden sind.",
      text4: "Es folgt das Abyssopelagial, das zwischen 4000 und 6000 Meter Tiefe liegt (gr. ábyssos = bodenlos). Genau wie in der darunter liegenden Schicht sind die Temperaturen in der Nähe von Gefrierpunkt und es gibt kein Eindringen von natürlichem Licht.",
      text5: "Die tiefsten Meeresregionen bezeichnet man als Hadopelagial (gr. ades = Unterwelt). Diese Zone reicht hinab bis in die Tiefseegräben, bis in etwa 11 000 Meter Tiefe. Natürliches Licht kann nicht in die Gräben eindringen. Der Grund der Ozeane ist in der Regel mit einer Schicht organischen Drecks gefüllt, der ein paar Zentimeter tief ist, wie ein Waldboden.",
    },
    {
      id: shortid.generate(),
      title: "Lebewesen",
      text1: "Diese oberste, vom Licht beeinflusste Schicht ist besonders produktiv, da hier die Primärproduzenten (Algen, Cyanobakterien und Seegras) durch die Photosynthese Biomasse aufbauen. Diese Primärproduktion ist Basis des Lebens im Meer. Hier tummeln sich die meisten bekannten Meeresbewohner, so wie viele der Fische, die wir essen, und die Korallenriffe, die unsere Schiffe überraschen",
      text2: "Während im oberen Bereich dieser Zone noch Plankton und Korallen zu finden sind, leben im unteren Bereich schon Tiefsee-Beilfische. In der Zone leben einige der seltsamsten Meerestiere wie der Schwertfisch und der Wolfsaal.",
      text3: "In dieser Zone leben viele Tiefseearten – Fische, Krebse oder auch Schnecken. Riesen- und Kolossalkalmare sind hier ebenso zu finden wie Pottwale. Die Tiere, die dort leben, haben ausgeprägte Sinne und raffinierte Strategien, um Beute zu machen. Oft haben Sie ein bizarres Aussehen. Zu ihnen zählen Angler-, Viper-, und Fangzahnfische. ",
      text4: "Hier leben Grundnahrungsmittel, von denen viele schaufelförmige Kiefer haben, um Ablagerungen vom Meeresboden zu heben. Wirbellose wie Seesterne und Tintenfische können in dieser Umgebung überleben.",
      text5: "Forscher gehen davon aus, dass es in dieser Zone massenhaft unentdeckte Arten gibt. Bekannt ist dagegen schon der Borstenwurm, der es dort mit dem ungeheuren Druck und Temperaturen nahe dem Gefrierpunkt aufnimmt. Verschiedene Kreaturen können in dieser Schicht gefunden werden, hauptsächlich Wirbellose einschließlich Seesternen.",
    },
    {
      id: shortid.generate(),
      title: "Verschmutzung",
      text1: "Bedroht werden diese Arten u.a. durch herabsinkendes Mikroplastik, welches die Meerestiere mit Nahrung verwechseln und fressen. Schätzungen zufolge landen jährlich zwischen 4,8 und 12,7 Millionen Tonnen Plastikmüll in den Ozeanen.",
      text2: "Auch hier sind die Tiere durch Plastik bedroht. So haben Forscher*innen bei 73% der untersuchten Fische im Nordatlantik Plastik im Bauch nachgewiesen.",
      text3: "Während nur ein kleiner Teil an der Oberfläche schwimmt, sinkt der Großteil in Form von Mikroplastik in die tieferen Meeresschichten. Hier finden sich neben Mikroplastik noch größere Plastikteile.",
      text4: "Es finden sich neben Mikroplastik noch größere Plastikteile.",
      text5: "Selbst in dieser Tiefe, im Marianengraben, haben Meeresforscher*innen noch eine Plastiktüte entdeckt.",
    },
    {
      id: shortid.generate(),
      title: "Klimawandel",
      text1: "Die extrem artenreichen Öko-Systeme sind auch durch die wärmeren Temperaturen bedroht. Wissenschaftler gehen davon aus, dass nur rund die Hälfte aller Korallenriffe erhalten bleibt, wenn wir den Temperaturanstieg auf derzeit unrealistische 1,2 Grad Celsius beschränken.  ",
      text2: "Meere nehmen große Mengen Kohlendioxid auf. Laut dem Helmholtz-Zentrum für Polar- und Meeresforschung haben sie mehr als ein Viertel des vom Menschen verursachten atmosphärischen Kohlendioxids aufgenommen. Für sie hat das fatale Folgen. Denn: Seit Beginn der industriellen Revolution sind die Meere um fast 30 Prozent saurer geworden, weil die Aufnahme des Kohlendioxids den pH-Wert der Meere senkt. Die Folgen der Versauerung reichen von Leiden der Wasserlebewesen bis hin zu fatalen Auswirkungen für die Menschen.",
      text3: "Die Versauerung der Meere hat nicht nur Auswirkungen auf die Unterwasserwelt. Sie wirkt sich auch auf die Fähigkeit des Ozeans aus, Kohlenstoff zu speichern. Heißt: Je mehr Kohlendioxid die Meere aufnehmen, desto saurer werden sie, und je saurer sie werden, desto weniger Kohlendioxid können sie aufnehmen. Ihre so wichtige Funktion für die Begrenzung der Klimakrise ist damit also gefährdet.",
      text4: "Die Versauerung der Meere schreitet überall voran – besonders schnell in den Polarregionen. Dort könnte es, so das Helmholtz-Zentrum für Polar- und Meeresforschung, bereits Mitte dieses Jahrhunderts dazu führen, dass zu wenig Aragonit vorhanden ist. Nie gehört? Aragonit ist ein wichtiger Bestandteil von Kalkschalen. Unter einem Mangel leiden also vor allem etwa Muscheln, Seesterne und Korallen – und die oben angesprochenen Korallenriffe",
      text5: "Für die Versauerung der Meere gibt es nur einen Therapieansatz: Wir müssen unseren Kohlendioxidausstoß reduzieren. Die 'Therapie' ist allerdings eher langfristig angelegt. Das Alfred-Wegener-Institut rechnet damit, dass die Ozeane Tausende von Jahren bräuchten, sich zu erholen – selbst wenn wir es schaffen würden, den CO2-Ausstoß von heute auf morgen auf null zu reduzieren. Die Versauerung ist nicht das einzige große Problem der Meere. Sie sind außerdem zu warm, verdreckt, ausgeraubt und leer gefischt.",
    },
    {
      id: shortid.generate(),
      title: "Weitere Probleme",
      text1: "Meeresverschmutzungen tragen zu einem verstärkten Eutrophierungsprozess bei. Die Anreicherung von Nährstoffen verursacht eine Massenvermehrung von Algen- und Cyanobakterien. Obwohl die Schichten infolge der Fotosynthese des Phytoplanktons zunächst mit Sauerstoff angereichert werden nach dem Absterben der Algen werden diese durch Bakterien abgebaut, was viel Sauerstoff benötigt, sodass die Sauerstoffkonzentration des Sees rasch absinkt.",
      text2: "Eine starke Bedrohung der im Meer lebenden Organismen geht von anthropogenen Stoffeinträgen aus. Die Verschmutzung der Meere durch Schadstoffe wird zu mehr als 80 % durch Aktivitäten auf dem Festland verursacht. Durch Flüsse gelangen Halogenverbindungen, Öle, Schwermetalle und Nährstoffe in die Meere und gefährden insbesondere die Lebensgemeinschaften der Küstenregionen und die an den Küsten lebenden Menschen.",
      text3: "Zusätzlich zu der oben genannten Eutrophierung werden bei Fäulnisprozessen die verbliebenen Sauerstoffreste verbraucht, sodass eine Faulschlammschicht entsteht. Als Stoffwechselprodukte entstehen toxische Kohlenwasserstoffe, z.B. Methan. Dadurch sterben Fische, Krebse und Schnecken an Sauerstoffmangel.",
      text4: "Das Endstadium der Eutrophierung ist der Extremfall: Das so genannte „Umkippen“ des Sees, in dem der See biologisch tot ist. Meist tritt dieser Fall jedoch nicht ein, sondern es stellt sich ein biologisches Gleichgewicht ein. Den Grad der Eutrophierung kann man u.a. an der Häufigkeit bestimmter Fischarten erkennen.",
      text5: "Während sich die natürliche Eutrophierung von Seen in Zeiträumen von Tausenden Jahren vollzieht, läuft die E. durch anthropogene Einflüsse in nur wenigen Jahrzehnten ab. Längerfristig lässt sich die E. nur durch eine starke Beschränkung der Nährstoffzufuhr, z.B. durch eine Nährstoffentfernung aus Abwässern, vermindern.",
    },
    {
      id: shortid.generate(),
      title: "Wussten Sie das?",
      text1: "Die epipelagiale Schicht (gr. pélagos (offene See) und epí (auf)) reicht von der Wasseroberfläche bis in eine Tiefe von 200m. Es gibt viel Licht und Wärme in dieser Schicht, obwohl beide mit zunehmender Tiefe abnehmen. Der Druck ist ebenfalls minimal und steigt mit der Tiefe.",
      text2: "An das Epipelagial schließt sich das Mesopelagial an, das bis in etwa 1000 Meter Tiefe hinunterreicht (gr. mésos = Mitte). Die Biodichte ist hier geringer als die der darüber liegenden epipelagischen Zone, da das Eindringen von Licht in die unteren Regionen dieser Zone schnell abfällt. Schwache Sonnenstrahlen durchdringen die Schicht. Wer bis zum Ende dieser Zone vordringen möchte, kann das nur noch mit einem Tauchfahrzeug, denn der Wasserdruck ist dort längst zu hoch für den menschlichen Körper.",
      text3: "Die daran anschließende Zone zwischen 1000 und 4000 Metern bezeichnet man als Bathypelagial (gr. bathýs = tief). Diese Schicht wird auch als Mitternachts- oder Dunkelzone bezeichnet. In diese Tiefe gelangt sehr wenig Licht, weshalb hier keine lebenden Pflanzen zu finden sind.",
      text4: "Es folgt das Abyssopelagial, das zwischen 4000 und 6000 Meter Tiefe liegt (gr. ábyssos = bodenlos). Genau wie in der darunter liegenden Schicht sind die Temperaturen in der Nähe von Gefrierpunkt und es gibt kein Eindringen von natürlichem Licht.",
      text5: "Die tiefsten Meeresregionen bezeichnet man als Hadopelagial (gr. ades = Unterwelt). Diese Zone reicht hinab bis in die Tiefseegräben, bis in etwa 11 000 Meter Tiefe. Natürliches Licht kann nicht in die Gräben eindringen. Der Grund der Ozeane ist in der Regel mit einer Schicht organischen Drecks gefüllt, der ein paar Zentimeter tief ist, wie ein Waldboden.",
    },
    {
      id: shortid.generate(),
      title: "Lebewesen",
      text1: "Diese oberste, vom Licht beeinflusste Schicht ist besonders produktiv, da hier die Primärproduzenten (Algen, Cyanobakterien und Seegras) durch die Photosynthese Biomasse aufbauen. Diese Primärproduktion ist Basis des Lebens im Meer. Hier tummeln sich die meisten bekannten Meeresbewohner, so wie viele der Fische, die wir essen, und die Korallenriffe, die unsere Schiffe überraschen",
      text2: "Während im oberen Bereich dieser Zone noch Plankton und Korallen zu finden sind, leben im unteren Bereich schon Tiefsee-Beilfische. In der Zone leben einige der seltsamsten Meerestiere wie der Schwertfisch und der Wolfsaal.",
      text3: "In dieser Zone leben viele Tiefseearten – Fische, Krebse oder auch Schnecken. Riesen- und Kolossalkalmare sind hier ebenso zu finden wie Pottwale. Die Tiere, die dort leben, haben ausgeprägte Sinne und raffinierte Strategien, um Beute zu machen. Oft haben Sie ein bizarres Aussehen. Zu ihnen zählen Angler-, Viper-, und Fangzahnfische. ",
      text4: "Hier leben Grundnahrungsmittel, von denen viele schaufelförmige Kiefer haben, um Ablagerungen vom Meeresboden zu heben. Wirbellose wie Seesterne und Tintenfische können in dieser Umgebung überleben.",
      text5: "Forscher gehen davon aus, dass es in dieser Zone massenhaft unentdeckte Arten gibt. Bekannt ist dagegen schon der Borstenwurm, der es dort mit dem ungeheuren Druck und Temperaturen nahe dem Gefrierpunkt aufnimmt. Verschiedene Kreaturen können in dieser Schicht gefunden werden, hauptsächlich Wirbellose einschließlich Seesternen.",
    },
    {
      id: shortid.generate(),
      title: "Verschmutzung",
      text1: "Bedroht werden diese Arten u.a. durch herabsinkendes Mikroplastik, welches die Meerestiere mit Nahrung verwechseln und fressen. Schätzungen zufolge landen jährlich zwischen 4,8 und 12,7 Millionen Tonnen Plastikmüll in den Ozeanen.",
      text2: "Auch hier sind die Tiere durch Plastik bedroht. So haben Forscher*innen bei 73% der untersuchten Fische im Nordatlantik Plastik im Bauch nachgewiesen.",
      text3: "Während nur ein kleiner Teil an der Oberfläche schwimmt, sinkt der Großteil in Form von Mikroplastik in die tieferen Meeresschichten. Hier finden sich neben Mikroplastik noch größere Plastikteile.",
      text4: "Es finden sich neben Mikroplastik noch größere Plastikteile.",
      text5: "Selbst in dieser Tiefe, im Marianengraben, haben Meeresforscher*innen noch eine Plastiktüte entdeckt.",
    },
    {
      id: shortid.generate(),
      title: "Klimawandel",
      text1: "Die extrem artenreichen Öko-Systeme sind auch durch die wärmeren Temperaturen bedroht. Wissenschaftler gehen davon aus, dass nur rund die Hälfte aller Korallenriffe erhalten bleibt, wenn wir den Temperaturanstieg auf derzeit unrealistische 1,2 Grad Celsius beschränken.  ",
      text2: "Meere nehmen große Mengen Kohlendioxid auf. Laut dem Helmholtz-Zentrum für Polar- und Meeresforschung haben sie mehr als ein Viertel des vom Menschen verursachten atmosphärischen Kohlendioxids aufgenommen. Für sie hat das fatale Folgen. Denn: Seit Beginn der industriellen Revolution sind die Meere um fast 30 Prozent saurer geworden, weil die Aufnahme des Kohlendioxids den pH-Wert der Meere senkt. Die Folgen der Versauerung reichen von Leiden der Wasserlebewesen bis hin zu fatalen Auswirkungen für die Menschen.",
      text3: "Die Versauerung der Meere hat nicht nur Auswirkungen auf die Unterwasserwelt. Sie wirkt sich auch auf die Fähigkeit des Ozeans aus, Kohlenstoff zu speichern. Heißt: Je mehr Kohlendioxid die Meere aufnehmen, desto saurer werden sie, und je saurer sie werden, desto weniger Kohlendioxid können sie aufnehmen. Ihre so wichtige Funktion für die Begrenzung der Klimakrise ist damit also gefährdet.",
      text4: "Die Versauerung der Meere schreitet überall voran – besonders schnell in den Polarregionen. Dort könnte es, so das Helmholtz-Zentrum für Polar- und Meeresforschung, bereits Mitte dieses Jahrhunderts dazu führen, dass zu wenig Aragonit vorhanden ist. Nie gehört? Aragonit ist ein wichtiger Bestandteil von Kalkschalen. Unter einem Mangel leiden also vor allem etwa Muscheln, Seesterne und Korallen – und die oben angesprochenen Korallenriffe",
      text5: "Für die Versauerung der Meere gibt es nur einen Therapieansatz: Wir müssen unseren Kohlendioxidausstoß reduzieren. Die 'Therapie' ist allerdings eher langfristig angelegt. Das Alfred-Wegener-Institut rechnet damit, dass die Ozeane Tausende von Jahren bräuchten, sich zu erholen – selbst wenn wir es schaffen würden, den CO2-Ausstoß von heute auf morgen auf null zu reduzieren. Die Versauerung ist nicht das einzige große Problem der Meere. Sie sind außerdem zu warm, verdreckt, ausgeraubt und leer gefischt.",
    },
    {
      id: shortid.generate(),
      title: "Weitere Probleme",
      text1: "Meeresverschmutzungen tragen zu einem verstärkten Eutrophierungsprozess bei. Die Anreicherung von Nährstoffen verursacht eine Massenvermehrung von Algen- und Cyanobakterien. Obwohl die Schichten infolge der Fotosynthese des Phytoplanktons zunächst mit Sauerstoff angereichert werden nach dem Absterben der Algen werden diese durch Bakterien abgebaut, was viel Sauerstoff benötigt, sodass die Sauerstoffkonzentration des Sees rasch absinkt.",
      text2: "Eine starke Bedrohung der im Meer lebenden Organismen geht von anthropogenen Stoffeinträgen aus. Die Verschmutzung der Meere durch Schadstoffe wird zu mehr als 80 % durch Aktivitäten auf dem Festland verursacht. Durch Flüsse gelangen Halogenverbindungen, Öle, Schwermetalle und Nährstoffe in die Meere und gefährden insbesondere die Lebensgemeinschaften der Küstenregionen und die an den Küsten lebenden Menschen.",
      text3: "Zusätzlich zu der oben genannten Eutrophierung werden bei Fäulnisprozessen die verbliebenen Sauerstoffreste verbraucht, sodass eine Faulschlammschicht entsteht. Als Stoffwechselprodukte entstehen toxische Kohlenwasserstoffe, z.B. Methan. Dadurch sterben Fische, Krebse und Schnecken an Sauerstoffmangel.",
      text4: "Das Endstadium der Eutrophierung ist der Extremfall: Das so genannte „Umkippen“ des Sees, in dem der See biologisch tot ist. Meist tritt dieser Fall jedoch nicht ein, sondern es stellt sich ein biologisches Gleichgewicht ein. Den Grad der Eutrophierung kann man u.a. an der Häufigkeit bestimmter Fischarten erkennen.",
      text5: "Während sich die natürliche Eutrophierung von Seen in Zeiträumen von Tausenden Jahren vollzieht, läuft die E. durch anthropogene Einflüsse in nur wenigen Jahrzehnten ab. Längerfristig lässt sich die E. nur durch eine starke Beschränkung der Nährstoffzufuhr, z.B. durch eine Nährstoffentfernung aus Abwässern, vermindern.",
    },
  ]);

  //Entry item of flatlist
  const renderItem1 = ({ item }) => (
    <ListItem1
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text1}
    ></ListItem1>
  );

  const renderItem2 = ({ item }) => (
    <ListItem2
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text2}
    ></ListItem2>
  );

  const renderItem3 = ({ item }) => (
    <ListItem3
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text3}
    ></ListItem3>
  );

  const renderItem4 = ({ item }) => (
    <ListItem4
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text4}
    ></ListItem4>
  );

  const renderItem5 = ({ item }) => (
    <ListItem5
      width={width}
      height={height}
      color={item.color}
      title={item.title}
      text={item.text5}
    ></ListItem5>
  );

  //Constantly update current offset
  const getCurrentOffset = (event) =>
    setCurrentOffsetX(event.nativeEvent.contentOffset.x);

  //Scroll according to head rotation
  useEffect(() => {
    if (ref && !isScrolling) {
      ref.scrollToOffset({ offset: currentOffsetX + (gyroData.x * width) / 5 });
    }
  }, [gyroData]);

  //Change layer according to head tilt
  useEffect(() => {
    changeLayer();
  }, [accData]);

  //Called when accelerometer data changes
  const changeLayer = () => {
    if (accData && changable) {
      if (accData.z > 0.75 && index !== 4) {
        //Index +1
        setIndex(index + 1);
        setChangable(false);
        setTimeout(() => {
          setChangable(true);
        }, 5000);
      } else if (accData.z < -0.75 && index !== 0) {
        //Index -1
        setIndex(index - 1);
        setChangable(false);
        setTimeout(() => {
          setChangable(true);
        }, 5000);
      }
    }
  };

  //Scroll to end when flatlist is initiated
  useEffect(() => {
    if (ref) {
   
        ref.scrollToEnd({ animated: false });
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [ref]);

  //Call this in onScroll to check if start point is reached
  const onStartReached = (event) => {
    if (event.nativeEvent.contentOffset.x == 0) {
      setData([
        { id: shortid.generate(), title: "First Item", color: "blue" },
        { id: shortid.generate(), title: "Second Item", color: "green" },
        { id: shortid.generate(), title: "Third Item", color: "red" },
        { id: shortid.generate(), title: "Fourth Item", color: "yellow" },
        { id: shortid.generate(), title: "Fifth Item", color: "yellow" },
        ...data,
      ]);
      return true;
    }
  };

  //Fires when end point of flatlist is reached
  const endHandler = () => {
    setData([
      ...data,
      {
        id: shortid.generate(),
        title: "Klimawandel",
        text1: "Die extrem artenreichen Öko-Systeme sind auch durch die wärmeren Temperaturen bedroht. Wissenschaftler gehen davon aus, dass nur rund die Hälfte aller Korallenriffe erhalten bleibt, wenn wir den Temperaturanstieg auf derzeit unrealistische 1,2 Grad Celsius beschränken.  ",
        text2: "Meere nehmen große Mengen Kohlendioxid auf. Laut dem Helmholtz-Zentrum für Polar- und Meeresforschung haben sie mehr als ein Viertel des vom Menschen verursachten atmosphärischen Kohlendioxids aufgenommen. Für sie hat das fatale Folgen. Denn: Seit Beginn der industriellen Revolution sind die Meere um fast 30 Prozent saurer geworden, weil die Aufnahme des Kohlendioxids den pH-Wert der Meere senkt. Die Folgen der Versauerung reichen von Leiden der Wasserlebewesen bis hin zu fatalen Auswirkungen für die Menschen.",
        text3: "Die Versauerung der Meere hat nicht nur Auswirkungen auf die Unterwasserwelt. Sie wirkt sich auch auf die Fähigkeit des Ozeans aus, Kohlenstoff zu speichern. Heißt: Je mehr Kohlendioxid die Meere aufnehmen, desto saurer werden sie, und je saurer sie werden, desto weniger Kohlendioxid können sie aufnehmen. Ihre so wichtige Funktion für die Begrenzung der Klimakrise ist damit also gefährdet.",
        text4: "Die Versauerung der Meere schreitet überall voran – besonders schnell in den Polarregionen. Dort könnte es, so das Helmholtz-Zentrum für Polar- und Meeresforschung, bereits Mitte dieses Jahrhunderts dazu führen, dass zu wenig Aragonit vorhanden ist. Nie gehört? Aragonit ist ein wichtiger Bestandteil von Kalkschalen. Unter einem Mangel leiden also vor allem etwa Muscheln, Seesterne und Korallen – und die oben angesprochenen Korallenriffe",
        text5: "Für die Versauerung der Meere gibt es nur einen Therapieansatz: Wir müssen unseren Kohlendioxidausstoß reduzieren. Die 'Therapie' ist allerdings eher langfristig angelegt. Das Alfred-Wegener-Institut rechnet damit, dass die Ozeane Tausende von Jahren bräuchten, sich zu erholen – selbst wenn wir es schaffen würden, den CO2-Ausstoß von heute auf morgen auf null zu reduzieren. Die Versauerung ist nicht das einzige große Problem der Meere. Sie sind außerdem zu warm, verdreckt, ausgeraubt und leer gefischt.",
      },
      {
        id: shortid.generate(),
        title: "Weitere Probleme",
        text1: "Meeresverschmutzungen tragen zu einem verstärkten Eutrophierungsprozess bei. Die Anreicherung von Nährstoffen verursacht eine Massenvermehrung von Algen- und Cyanobakterien. Obwohl die Schichten infolge der Fotosynthese des Phytoplanktons zunächst mit Sauerstoff angereichert werden nach dem Absterben der Algen werden diese durch Bakterien abgebaut, was viel Sauerstoff benötigt, sodass die Sauerstoffkonzentration des Sees rasch absinkt.",
        text2: "Eine starke Bedrohung der im Meer lebenden Organismen geht von anthropogenen Stoffeinträgen aus. Die Verschmutzung der Meere durch Schadstoffe wird zu mehr als 80 % durch Aktivitäten auf dem Festland verursacht. Durch Flüsse gelangen Halogenverbindungen, Öle, Schwermetalle und Nährstoffe in die Meere und gefährden insbesondere die Lebensgemeinschaften der Küstenregionen und die an den Küsten lebenden Menschen.",
        text3: "Zusätzlich zu der oben genannten Eutrophierung werden bei Fäulnisprozessen die verbliebenen Sauerstoffreste verbraucht, sodass eine Faulschlammschicht entsteht. Als Stoffwechselprodukte entstehen toxische Kohlenwasserstoffe, z.B. Methan. Dadurch sterben Fische, Krebse und Schnecken an Sauerstoffmangel.",
        text4: "Das Endstadium der Eutrophierung ist der Extremfall: Das so genannte „Umkippen“ des Sees, in dem der See biologisch tot ist. Meist tritt dieser Fall jedoch nicht ein, sondern es stellt sich ein biologisches Gleichgewicht ein. Den Grad der Eutrophierung kann man u.a. an der Häufigkeit bestimmter Fischarten erkennen.",
        text5: "Während sich die natürliche Eutrophierung von Seen in Zeiträumen von Tausenden Jahren vollzieht, läuft die E. durch anthropogene Einflüsse in nur wenigen Jahrzehnten ab. Längerfristig lässt sich die E. nur durch eine starke Beschränkung der Nährstoffzufuhr, z.B. durch eine Nährstoffentfernung aus Abwässern, vermindern.",
      },
      {
        id: shortid.generate(),
        title: "Wussten Sie das?",
        text1: "Die epipelagiale Schicht (gr. pélagos (offene See) und epí (auf)) reicht von der Wasseroberfläche bis in eine Tiefe von 200m. Es gibt viel Licht und Wärme in dieser Schicht, obwohl beide mit zunehmender Tiefe abnehmen. Der Druck ist ebenfalls minimal und steigt mit der Tiefe.",
        text2: "An das Epipelagial schließt sich das Mesopelagial an, das bis in etwa 1000 Meter Tiefe hinunterreicht (gr. mésos = Mitte). Die Biodichte ist hier geringer als die der darüber liegenden epipelagischen Zone, da das Eindringen von Licht in die unteren Regionen dieser Zone schnell abfällt. Schwache Sonnenstrahlen durchdringen die Schicht. Wer bis zum Ende dieser Zone vordringen möchte, kann das nur noch mit einem Tauchfahrzeug, denn der Wasserdruck ist dort längst zu hoch für den menschlichen Körper.",
        text3: "Die daran anschließende Zone zwischen 1000 und 4000 Metern bezeichnet man als Bathypelagial (gr. bathýs = tief). Diese Schicht wird auch als Mitternachts- oder Dunkelzone bezeichnet. In diese Tiefe gelangt sehr wenig Licht, weshalb hier keine lebenden Pflanzen zu finden sind.",
        text4: "Es folgt das Abyssopelagial, das zwischen 4000 und 6000 Meter Tiefe liegt (gr. ábyssos = bodenlos). Genau wie in der darunter liegenden Schicht sind die Temperaturen in der Nähe von Gefrierpunkt und es gibt kein Eindringen von natürlichem Licht.",
        text5: "Die tiefsten Meeresregionen bezeichnet man als Hadopelagial (gr. ades = Unterwelt). Diese Zone reicht hinab bis in die Tiefseegräben, bis in etwa 11 000 Meter Tiefe. Natürliches Licht kann nicht in die Gräben eindringen. Der Grund der Ozeane ist in der Regel mit einer Schicht organischen Drecks gefüllt, der ein paar Zentimeter tief ist, wie ein Waldboden.",
      },
      {
        id: shortid.generate(),
        title: "Lebewesen",
        text1: "Diese oberste, vom Licht beeinflusste Schicht ist besonders produktiv, da hier die Primärproduzenten (Algen, Cyanobakterien und Seegras) durch die Photosynthese Biomasse aufbauen. Diese Primärproduktion ist Basis des Lebens im Meer. Hier tummeln sich die meisten bekannten Meeresbewohner, so wie viele der Fische, die wir essen, und die Korallenriffe, die unsere Schiffe überraschen",
        text2: "Während im oberen Bereich dieser Zone noch Plankton und Korallen zu finden sind, leben im unteren Bereich schon Tiefsee-Beilfische. In der Zone leben einige der seltsamsten Meerestiere wie der Schwertfisch und der Wolfsaal.",
        text3: "In dieser Zone leben viele Tiefseearten – Fische, Krebse oder auch Schnecken. Riesen- und Kolossalkalmare sind hier ebenso zu finden wie Pottwale. Die Tiere, die dort leben, haben ausgeprägte Sinne und raffinierte Strategien, um Beute zu machen. Oft haben Sie ein bizarres Aussehen. Zu ihnen zählen Angler-, Viper-, und Fangzahnfische. ",
        text4: "Hier leben Grundnahrungsmittel, von denen viele schaufelförmige Kiefer haben, um Ablagerungen vom Meeresboden zu heben. Wirbellose wie Seesterne und Tintenfische können in dieser Umgebung überleben.",
        text5: "Forscher gehen davon aus, dass es in dieser Zone massenhaft unentdeckte Arten gibt. Bekannt ist dagegen schon der Borstenwurm, der es dort mit dem ungeheuren Druck und Temperaturen nahe dem Gefrierpunkt aufnimmt. Verschiedene Kreaturen können in dieser Schicht gefunden werden, hauptsächlich Wirbellose einschließlich Seesternen.",
      },
      {
        id: shortid.generate(),
        title: "Verschmutzung",
        text1: "Bedroht werden diese Arten u.a. durch herabsinkendes Mikroplastik, welches die Meerestiere mit Nahrung verwechseln und fressen. Schätzungen zufolge landen jährlich zwischen 4,8 und 12,7 Millionen Tonnen Plastikmüll in den Ozeanen.",
        text2: "Auch hier sind die Tiere durch Plastik bedroht. So haben Forscher*innen bei 73% der untersuchten Fische im Nordatlantik Plastik im Bauch nachgewiesen.",
        text3: "Während nur ein kleiner Teil an der Oberfläche schwimmt, sinkt der Großteil in Form von Mikroplastik in die tieferen Meeresschichten. Hier finden sich neben Mikroplastik noch größere Plastikteile.",
        text4: "Es finden sich neben Mikroplastik noch größere Plastikteile.",
        text5: "Selbst in dieser Tiefe, im Marianengraben, haben Meeresforscher*innen noch eine Plastiktüte entdeckt.",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {index == 0 ? (
        <FlatList
          initialNumToRender={2} 
          style={styles.scrollView}
          horizontal
          data={data}
          onLayout={() => {
            ref.scrollToEnd({ animated: false });
            setTimeout(() => {
              setIsScrolling(false);
            }, 1000);
          }}
          renderItem={renderItem1}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.25}
          onEndReached={endHandler}
          ref={(ref) => setRef(ref)}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={getCurrentOffset}
        />
      ) : index == 1 ? (
        <FlatList
          initialNumToRender={2}
          style={styles.scrollView}
          horizontal
          data={data}
          renderItem={renderItem2}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.25}
          onEndReached={endHandler}
          ref={(ref) => setRef(ref)}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={getCurrentOffset}
        />
      ) : index == 2 ? (
        <FlatList
          initialNumToRender={2}
          style={styles.scrollView}
          horizontal
          data={data}
          renderItem={renderItem3}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.25}
          onEndReached={endHandler}
          ref={(ref) => setRef(ref)}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={getCurrentOffset}
        />
      ) : index == 3 ? (
        <FlatList
          initialNumToRender={2}
          style={styles.scrollView}
          horizontal
          data={data}
          renderItem={renderItem4}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.25}
          onEndReached={endHandler}
          ref={(ref) => setRef(ref)}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={getCurrentOffset}
        />
      ) : index == 4 ? (
        <FlatList
          initialNumToRender={2}
          style={styles.scrollView}
          horizontal
          data={data}
          renderItem={renderItem5}
          keyExtractor={(item) => item.id}
          onEndReachedThreshold={0.25}
          onEndReached={endHandler}
          ref={(ref) => setRef(ref)}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={getCurrentOffset}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 42,
  },
  text2: {
    fontSize: 42,
    backgroundColor: "green",
  },
});

export default DepthNavigator;
