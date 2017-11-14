import React, { Component } from 'react'

const api_yt_srch_url = 'https://www.googleapis.com/youtube/v3/search?'
const api_yt_key_prop = 'key='
const api_yt_key = 'AIzaSyBwnNqbRoNVMBvT6_8VY4pJ7pYzwAh6QAk'


var query = 'Amazon Sellers'


const amz_embed_url = 'https://www.amazon.com/gp/product/'


var amazonProductApi = require('amazon-product-api')

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
    var client = amazonProductApi.createClient({
      awsId: 'AKIAJS44JNVX7Y7VXDBQ',
      awsSecret: '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',
      awsTag: 'spryh-20'
    })

    client
      .itemSearch({
        keywords: 'Dewalt',
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
        <button onClick={this.clicked}>Get {query} Amazon Links </button>
        {/*rotate through the array
                        console.log(link);*/}
        {this.state.amz_results.map((link, i) => {
          // div needs a unique key
          var frame = (
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
