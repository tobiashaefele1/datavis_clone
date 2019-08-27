/* eslint-disable max-len */
import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class to create the Information modal.
 *
 * @class Info
 * @extends {Component}
 */
class Info extends Component {
    /**
     *This function closes the modal.
     *
     * @memberof Info
     */
    closeInfo = () => {
      this.props.dispatch({type: 'INFO'});
    }

    /**
     *This function renders the Info modal.
     *
     * @return {JSX}
     * @memberof Info
     */
    render() {
      if (this.props.showInfo) {
        return (
          <div className="modal is-active">
            <div className="modal-background"
              onClick={this.closeInfo.bind(this)}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Allgemeine Informationen</p>
              </header>
              <section className="modal-card-body">
                <p> Diese Website ermöglicht das Nachbauen von GRW-Indikatorik sowie das Anzeigen und Visualisieren einzelner Indikatoren, die die Gleichwertigkeit von Lebensverhältnissen in Deutschland abbilden.
                    <br/>
                    <br/>
                        Bei Fragen zu Funktionen, Methodologie oder Umsetzung wenden Sie sich bitte an Referat L B 3. </p>

                <h5 style={{margin: '20px', fontWeight: 'bold'}}>Indikatorencodierung</h5>
                <p> Die Suffixe hinter den individuellen Indikatoren geben, den Ursprung der eingespeisten Daten an. <br/> </p>
                <p>
                  <ul style={{listStyleType: 'square', padding: '0 50px'}}>
                    <li>100: Indikator liegt auf Kreisebene vor.  <br/></li>
                    <li>200: Indikator liegt auf Arbeitsmarktregioneneneben (2012) vor.  <br/></li>
                    <li>300: Indikator liegt auf Arbeitsmarktregioneneben (2015) vor.  <br/></li>
                    <li> 400: Indikator liegt auf Bundesebene (d.h. als Bundesdurchschnitt) vor.  <br/></li> </ul>
                </p>
                <p> <br/>
„Arbeitslosenquote_100“ zeigt demnach auf Kreisebene vorliegende Daten an. Das bedeutet, es liegen 402 Datenpunkte vor. Wird dieser Indikator auf einer anderen („höheren“) Ebene angezeigt (z.B. auf Ebene der Raumordnungsregionen oder Bundesländer), werden die Daten entsprechend der gewählten Referenzgröße (zweite Zeile unter dem ausgewählten Indikator) gewichtet und aggregiert.

                </p>
                  <p> <br/>
                      Wenn beispielsweise „Arbeitslosenquote_100“ (2015)  mit Referenzgröße „Zivile Erwerbspersonen_100“ (2015)  auf Ebene der Raumordnungsregionen angezeigt wird, werden die Arbeitslosenquoten der den jeweiligen Raumordnungsregionen zugehörigen Kreise mit der Anzahl der zivilen Erwerbspersonen im jeweiligen Kreis multipliziert. Dann werden die so gewichteten Kreiswerte addiert und durch die Gesamtzahl der Erwerbspersonen in der entsprechenden Raumordnungsregion geteilt, um die Arbeitslosenquote für die Raumordnungsregion zu berechnen.
                  </p>


                <p> <br/>
                    „Haushalte Breitband 100Mbit/s BBSR_300“ zeigt demgegenüber Daten auf Arbeitsmarktregionenebene (2015) an. Hier liegen entsprechend 257 Datenpunkte vor. Wird dieser Indikator auf einer tiefer gegliederten Ebene (z.B. auf Kreisebene) angezeigt, wird allen Kreisen der Wert derjenigen Arbeitsmarktregion zugeordnet, in der die Kreise liegen.
                </p>

                  <p> <br/>
                      Werden Indikatoren auf dem Level angezeigt, auf dem die Daten vorliegen (bspw. ein Indikator mit Suffix _100 auf Kreisebene), ist die als Referenzgröße gewählte Variable nicht von Belang.

                  </p>

                <h5 style={{margin: '20px', fontWeight: 'bold'}}>Ansicht einzelne Indikatoren</h5>
                <p>
                    In der Ansicht für einzelne Indikatoren können einzelne Indikatoren wie oben beschrieben angezeigt werden. Abgesehen von den für die Anzeige auf verschiedenen regionalen Gliederungsebenen notwendigen Aggregationen  bzw. Disaggregationen findet keine weitere Transformation von Indikatoren statt.                </p>

                <h5 style={{margin: '20px', fontWeight: 'bold'}}>Ansicht zusammengesetzte Indikatoren</h5>
                <p>
                    Zu diesem Zweck werden in dieser Ansicht alle Indikatoren nach <a href="http://doku.iab.de/mittab/1991/1991_1_MittAB_Blien_Koller_Schiebel.pdf">GRW-Methodik</a> gewichtet, standardisiert und skaliert.  <br/>
                    In dieser Ansicht werden alle Indikatoren nach GRW Methodik gewichtet, standardisiert und skaliert. <br/>
                </p>

                <p>
                    Dazu werden die folgenden Rechnungsschritte durchgeführt: <br/> </p>
                <p>
                    1. Aggregierung der Indikatoren auf entsprechender Ebene, wie oben beschrieben <br/> </p>
                <p>
                    2. Berechnung der Standardabweichung. Dabei werden  die „tatsächlichen“ Bundesmittelwerte als Mittelwerte herangezogen. Wo als Datenreihen verfügbar, haben diese denselben Indikatornamen mit Suffix _400. Ist ein entsprechender Mittelwert nicht verfügbar, wird die Standardabweichung anhand des arithmetischen Mittels gebildet und mit Hilfe der Bezugsgröße gewichtet. Die für die Berechnung der Standardabweichung verwendete Formel ist:
                <br/>
                </p>

                <div id = "standard_deviation_image"
                  style={{textAlign: 'center'}}>
                  <img src ="static/bmf/resources/standard_deviation.png" width="30%"
                    height="30%" align="middle">
                  </img>
                </div>

                <p> <br/>
                    3. Transformation. Nach Berechnung der Standardabweichung werden die Skalen transformiert. Dazu werden zwei verschiedene mathematische Methoden angewandt, je nachdem, ob „Strukturschwäche“ beim betreffenden Indikator durch einen höheren oder niedrigeren Wert ausgedrückt wird (bspw. Bruttoverdienst: ein höherer Indikatorwert korrespondiert mit einen niedrigeren Strukturschwächewert; bspw. Arbeitslosenquote: ein höherer Wert korrespondiert mit einen höheren Strukturschwächewert).                </p>
                <p>
                    Formel „höher ist besser“ - d.h. ein höherer Indikatorwert geht mit verringerter Strukturschwäche einher:
                </p>

                <div id = "HIB_image" style={{textAlign: 'center'}}>
                  <img src ="static/bmf/resources/Scale_HIB.png" style={{width: "30%", align: "middle",
                    height:"30%"}}>
                  </img>
                </div>

                <p>
                        Formel: „niedriger ist besser“ - d.h. ein höherer Indikatorwert geht mit erhöhter Strukturschwäche einher:
                </p>

                <div id = "LIB_image" style={{textAlign: 'center'}}>
                  <img src ="static/bmf/resources/SCALE_LIB.png" style={{width: "35%", align: "middle",
                    height:"30%"}}>
                  </img>
                </div>

                <p>
                    4. Multiplikative Verknüpfung. Die so erhaltenen Werte werden anhand des gewählten Gewichtungsfaktors multipliziert:
                </p>
                <p>
                </p>

                <div id = "LIB_image" style={{textAlign: 'center'}}>
                  <img src ="static/bmf/resources/combined_indicator.png" style={{width: "85%", align: "middle",
                    height:"100%"}}>
                  </img>
                </div>
                <br/>

                <h5 style={{margin: '20px', fontWeight: 'bold'}}>Skalenauswahl</h5>

                <p>1. Gleichmäßige Gruppen <br/></p>

                <p> <br/>
                    Datensatz wird vom niedrigsten zum höchsten Wert sortiert und in fünf möglichst gleichgroße Gruppen eingeteilt, d.h. in jeder Gruppe befinden sich ungefähr gleich viele Werte. Alle Werte in derselben Gruppe werden mit derselben Farbe eingefärbt.
                </p>

                <p> <br/>
                   Die Grenzen für die einzelnen Gruppen ergeben sich aus dem jeweils höchsten Wert in jeder Gruppe, d.h. die Intervallgrenzen zwischen den Gruppen sind möglicherweise nicht gleich weit. Die Anzahl an Werten pro Gruppe ist stabil.
                <br/></p>

                  <p> <br/>
                      2. Gleichmäßige Intervalle
                  </p>

                  <p> <br/>
                      Datensatz wird anhand von Minimalwert und Maximalwert in fünf gleichlange Intervalle unterteilt.  Alle Werte in derselben Gruppe werden mit derselben Farbe eingefärbt. Die Anzahl an Werten pro Gruppe variiert.
                  </p>

                  <p><br/> Fließende Intervalle <br/></p>

                  <p> <br/>Dem Minimal- und Maximalwert des Datensatzes werden die hellste bzw. dunkelste Farbe der ausgewählten Farbskala zugeordnet.</p>
                  <p> <br/>Jedem anderem Wert im Datensatz wird eine individuelle Farbe dazwischen zugeordnet, abhängig von seiner relativen Position zu Minimal- bzw. Maximalwert. </p>


                  <h5 style={{margin: '20px', fontWeight: 'bold'}}>Exportfunktionen</h5>

                  <p>1. csv Datentabelle exportieren <br/></p>
                  <p>Diese Funktion exportiert alle derzeit in der Tabelle angezeigten Zeilen und Spalten in eine .csv Datei. Um alle Daten in der Tabelle anzuzeigen (und herunterzuladen), müssen in der Tabelle entsprechend erst alle Zeilen zur Anzeige augewählt werden.
                  <br/></p>

                  <p> 2. Karte exportieren <br/></p>
                   <p>Diese Funktion exportiert die derzeitige Karte, den Titel sowie die Legende als .svg Datei.</p>

                  <p> 3. Metadaten exportieren <br/></p>
                   <p>
                       Diese Funktion exportiert die  Metadaten für alle in der Datenbank verfügbaren Variablen. Der „databasename“ entspricht dabei dem im Tool angezeigten Namen mit entsprechendem Suffix (_100, _200 etc.). Der „csvname“ entspricht dem in der Importdatei eingegebenen Namen. Die anderen 7 Spalten („Anmerkungen“, „Berechnung“, „Einheit“, „Langname“, „Level“, „Quelle“ und „Standardisierung“) entsprechen den andern in der Importdatei spezifizierten  Metadaten.



                   </p>


                    <p> Entwicklung: Tobias Haefele und Jacob Roeters van Lennep</p>

              </section>
              <footer className="modal-card-foot">
                <div className="buttons is-centered">
                  <a href="mailto:jacob@roetersvanlennep.com,tobias@haefele-home.de?subject=BMF Visualization" className="button is-dark is-outlined">Kontakt</a>
                </div>
              </footer>
              <div>
              </div>
            </div>
            <button className="modal-close is-large" onClick={this.closeInfo.bind(this)} aria-label="close"></button>
          </div>);
      } else {
        return ('');
      }
    }
}

/**
 *Here the props are selected from the store.
 *
 * @param {state} state current state of the store
 * @return {props} returns the selected states as props
 */
function mapStateToProps(state) {
  return {
    showInfo: state.showInfo,
  };
}

export default connect(mapStateToProps)(Info);
