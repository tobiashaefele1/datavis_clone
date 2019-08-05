// // the original file - I play around with it below
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table'


//
// class Tablecomplete extends Component {
//     render() {
//         return <h1>wtf does it work now?</h1>
//     }
// }


class Tablecomplete extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         students: [
            {id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com'},
            {id: 2, name: 'Ali', age: 19, email: 'ali@email.com'},
            {id: 3, name: 'Saad', age: 16, email: 'saad@email.com'},
            {id: 4, name: 'Asad', age: 25, email: 'asad@email.com'}
         ]
      };
      this.localtest = "hello";
      this.test = context;}

   renderTableHeader() {
      let header = Object.keys(this.state.students[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      return this.state.students.map((student, index) => {
         const { id, name, age, email } = student //destructuring
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{name}</td>
               <td>{age}</td>
               <td>{email}</td>
            </tr>
         )
      })
   }

   render() {
      return (
          <div>

            <h1 id='title'>{this.localtest}</h1>
            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
             <p> {this.localtest}</p>
             <p> {this.test.col_names_ref}</p>

         </div>


      )
   }
}


ReactDOM.render(<Tablecomplete />, document.getElementById('table_complete'));


//
// // the original file - I play around with it below
// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import ReactTable from 'react-table'
//
//
// //
// // class Tablecomplete extends Component {
// //     render() {
// //         return <h1>wtf does it work now?</h1>
// //     }
// // }
//
//
// class indicator extends Component {
//    render() {
//       return (
//           <div> Hello
//           </div>
//
//    }
// }
//
//
// ReactDOM.render(<Tablecomplete />, document.getElementById('table_complete'));



//
//
//
//
//
//
