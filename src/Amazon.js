import React, { Component } from 'react'

const api_amz_secret = 'brEx/HCmvsw4QpmWC32CIZpc3ngXPqsgptXi/1TH'
const api_amz_id = 'AKIAJS44JNVX7Y7VXDBQ'
const api_amz_tag = 'spryh-20'
let query = 'Turntable'

const amz_embed_url = 'https://www.amazon.com/gp/product/'

const amazonProductApi = require('amazon-product-api')

class Amazon extends Component {
  //construct an array to keep the data
  constructor(props) {
    super(props)
    this.state = {
      amz_results: []
    }
    //bind the array
    this.clicked = this.clicked.bind(this)
  }
  clicked() {
    let client = amazonProductApi.createClient({
      awsId: api_amz_id,
      awsSecret: api_amz_secret,
      awsTag: api_amz_tag
    })

    client
      .itemSearch({
        keywords: query,
        searchIndex: 'All',
        responseGroup: 'ItemAttributes,Offers,Images'
      })
      //results is the array of objects

      .then(results => {
        console.log(results)
        const amz_results = results.map(
          obj => amz_embed_url + obj.ASIN[0] ///for some reason Amazon packs these in single item arrays
        )
        this.setState({ amz_results })
        console.log(amz_results)
      })

      .catch(function(err) {
        console.log(err)
      })
  }

  render() {
    //log the url to the console
    /*console.log(finalURL);
        console.log(this.state.amz_results);
        console.log(encodeURI(query));*/
    return (
      <div>
        <button onClick={this.clicked}>
          Get Amazon {query} product links...{' '}
        </button>
        {/*rotate through the array
                        console.log(link);*/}
        {this.state.amz_results.map((link, i) => {
          // div needs a unique key
          let frame = (
            <div className="amazon" key={i}>
              <a href={link}>{link}</a>
            </div>
          )
          return frame
        })}
        {this.frame}
      </div>
    )
  }
}

export default Amazon
