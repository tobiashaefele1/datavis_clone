import React, {Component} from 'react';

export default class Import extends Component {
  render() {
    return (
      <div>
        <div id="myImportModal" className="import_modal">


          <div className="import_modal-content">
            <span className="close">&times;</span>
            <form method="post" encType="multipart/form-data">

              <input type="file" name="csv" accept="text/csv">
              </input>
              <input type="submit">
              </input>

            </form>
          </div>

        </div>
      </div>
    );
  }
}
