import React, {Component} from 'react';

/**
 *Component class to import the CSV file.
 *
 * @class Import
 * @extends {Component}
 */
class Import extends Component {
  /**
   *This will render the modal.
   *
   * @return {JSX}
   * @memberof Import
   */
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
export default Import;
