import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 *Component class to crete the Settings modal.
 *
 * @class Settings
 * @extends {Component}
 */
class Info extends Component {
    /**
     *This function closes the modal.
     *
     * @memberof Settings
     */
    closeInfo = () => {
      this.props.dispatch({type: 'INFO'});
    }
    /**
     *This Function changes the color of the map.
     *
     * @param {event} e this is the color that is selected.
     * @memberof Settings
     */
    // colorChange = (e) =>{
    //   this.props.dispatch(this.changeColorDispatch(e.target.value));
    // };
    //
    // scaleChange = (e) =>{
    //   this.props.dispatch(this.changeScaleDispatch(e.target.value));
    // };



    /**
     *This function creates a dispatch ready input.
     *
     * @param {*} value
     * @return {Dict} ready to send to dispatch
     * @memberof Settings
     */
    // changeColorDispatch(value) {
    //   return (
    //     {
    //       type: 'CHANGECOLOR',
    //       value,
    //     }
    //   );
    // };
    //
    // changeScaleDispatch(value) {
    //   return (
    //     {
    //       type: 'CHANGESCALE',
    //       value,
    //     }
    //   );
    // };


    /**
     *This function renders the Settings modal.
     *
     * @return {JSX}
     * @memberof Settings
     */
    render() {
      if (this.props.showInfo) {
        return (
          <div className="modal is-active">
            <div className="modal-background" onClick={this.closeInfo.bind(this)}></div>
              <div className="modal-card">
				  <header className="modal-card-head">
					  <p className="modal-card-title">Allgemeine Informationen</p>
				  </header>
              <section className="modal-card-body">

                  <p> Diese Website ermöglicht das Nachbauen von GRW-Indikatorik sowie das Anzeigen und Visualiseren einzelner Indikatoren, die die Gleichwertigkeit von Lebensverhältnissen in Deutschland abbilden.
Bei Fragen zu Funktionen, Methodologie oder Umsetzung, wenden Sie sich bitte an Tobias Haefele oder Jacob Roeters van Lennep. </p>

                  <h5 style={{margin: "20px", fontWeight: "bold"}}>Indikatorencodierung</h5>


                  <p> Die Suffixe hinter den individuellen Indikatoren geben, den Ursprung der eingespeisten Daten an. </p>
                    <p>
                        100: Indikator liegt auf Kreisebene vor.  <br/>
                        200: Indikator liegt auf Arbeitsmarktregioneneneben (2012) vor.  <br/>
                        300: Indikator liegt auf Arbeitsmarktregioneneben (2015) vor.  <br/>
                        400: Indikator liegt auf Bundesebene (d.h. als Bundesdurchschnitt) vor.  <br/>
                    </p>
                <p>
                „Arbeitslosenquote_100“ zeigt demnach auf Kreiseben vorliegende Daten an, das bedeutet es liegen 402 Datenpunkte vor. Wird dieser Indikator auf einer anderen („höheren“) Ebene angezeigt (z.B. auf Bundesländerebene), werden die Daten entsprechend der gewählten Referenzgröße gewichtet aufaggregiert.
                </p>
                <p>
                „Arbeitslosenquote_300“ zeigt demnach auf Arbeitsmarktregionenebene (2015) an. Das bedeutet es liegen 257 Datenpunkte vor. Wird dieser Indikator auf einer höheren Ebene (z.B. auf Kreiseebene) angezeigt, wird allen der jeweiligen Arbeitsmarktregion zugehörigen Kreise der Wert ebendieser Arbeitsmarktregion zugeordnet.
                Werden Indikatoren auf dem Level angezeigt auf dem die Daten vorliegen (bswp. ein Indikator mit Suffix _100 auf Kreisebene, ist die als Referenzgröße gewählte Variable nicht von Belang).
                </p>

                   <h5 style={{margin: "20px", fontWeight: "bold"}}>Ansicht einzelne Indikatoren</h5>

                  <p>In der Ansicht für einzelne Indikatoren können einzelne Indikatoren wie oben beschrieben angezeigt werden. Abgesehen von der für die Aggregierung notwendigen Aggregierungen findet keine weitere Transformation von Indikatoren statt.
                  </p>

                    <h5 style={{margin: "20px", fontWeight: "bold"}}>Ansicht zusammengesetzte Indikatoren</h5>
                  <p> In der Ansicht für aggregierte Indikatoren können standardisierte Indikatoren angezeigt werden, sowie dynmaisch zu Indikatornekombination nach GRW Methodik verbunden werden. <br/>
In dieser Ansicht werden alle Indikatoren nach GRW Methodik gewichtet, standardisiert und skaliert. <br/>
                      Dazu werden die folgenden Rechnungsschritte durchgeführt: </p>
                      <p>
                          '1)	Aggregierung der Indikatoren auf entsprechender Ebene (wie oben beschrieben)' </p>
                  <p>
'2)	Berechnung der Standardabweichung. Dabei werden (wo verfügbar)', die „tatsächlichen“ Bundesmittelwerte als Mittelwert herangezogen. Wo verfügbar haben diese denselben Indikatornamen mit Suffix _400. Ist ein enstprechender Mittelwert nicht verfügbar, wird die Standardabweichung anhand des arithmetischen Mittels gebildet und mit Hilfe der Bezugsgröße gewichtet. Die für die Berechnung der Standardabweichung verwendete Formel ist:
                  </p>
                  <p>

'3)	Transformation. Nach Berechnung der Standardabweichung werden die Skalen transformiert. Dazu werden zwei verschiedene mathematische Methoden angewandt, je nachdem ob für den Indikator ein höherer oder ein niedriger Wert Strukturschwäche abbildet. (bswp: Bruttoverdienst: ein höher Indikatorwert gibt einen niedrigeren Strukturschwächewert an; bswp. Arbeitslosenquote: ein höherer Wert gibt einen höheren Strukturschwächewert an)'.
                  </p>

                  <p>
Formel „höher ist besser“ '(d.h. ein höherer Indikatorwert geht mit verringerter Strukturschwäche einher)'


</p>
                  <p>
Formel: „niedriger ist besser“ '(d.h. ein höherer Indikatorwert geht mit erhöher Strukturschwäche einher)':

                  </p>

<p>
'4)	Multikative Verknüpfung. Die so erhaltenen Werte werden anhand des gewählten Gewichtungsfaktors multipliziert':
</p>
<p>
Angezeigter Indikator = '(x1 * Var1) + (x2 * Var2) + (x3 * Var3) + (x4 * Var4)'

                  </p>
                  

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
            </div>)
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
