// File generated using shipping zone admin endpoint
// https://help.shopify.com/en/api/reference/store-properties/shippingzone

import keyBy from 'lodash.keyby'

const shipping_zones = [
  {
    id: 182899212342,
    name: 'United States',
    tax: 0.0,
    code: 'US',
    tax_name: 'Federal Tax',
    provinces: [
      {
        id: 2009260851254,
        country_id: 182899212342,
        name: 'Alabama',
        code: 'AL',
        tax: 0.04,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.0,
      },
      {
        id: 2009260884022,
        country_id: 182899212342,
        name: 'Alaska',
        code: 'AK',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009260916790,
        country_id: 182899212342,
        name: 'American Samoa',
        code: 'AS',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009260949558,
        country_id: 182899212342,
        name: 'Arizona',
        code: 'AZ',
        tax: 0.056,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.6,
      },
      {
        id: 2009260982326,
        country_id: 182899212342,
        name: 'Arkansas',
        code: 'AR',
        tax: 0.065,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.5,
      },
      {
        id: 2009262784566,
        country_id: 182899212342,
        name: 'Armed Forces Americas',
        code: 'AA',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009262817334,
        country_id: 182899212342,
        name: 'Armed Forces Europe',
        code: 'AE',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009262850102,
        country_id: 182899212342,
        name: 'Armed Forces Pacific',
        code: 'AP',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009261015094,
        country_id: 182899212342,
        name: 'California',
        code: 'CA',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009261047862,
        country_id: 182899212342,
        name: 'Colorado',
        code: 'CO',
        tax: 0.029,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 2.9,
      },
      {
        id: 2009261080630,
        country_id: 182899212342,
        name: 'Connecticut',
        code: 'CT',
        tax: 0.0635,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.35,
      },
      {
        id: 2009261113398,
        country_id: 182899212342,
        name: 'Delaware',
        code: 'DE',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009261146166,
        country_id: 182899212342,
        name: 'District of Columbia',
        code: 'DC',
        tax: 0.0575,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.75,
      },
      {
        id: 2009261178934,
        country_id: 182899212342,
        name: 'Federated States of Micronesia',
        code: 'FM',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009261211702,
        country_id: 182899212342,
        name: 'Florida',
        code: 'FL',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009261244470,
        country_id: 182899212342,
        name: 'Georgia',
        code: 'GA',
        tax: 0.04,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.0,
      },
      {
        id: 2009261277238,
        country_id: 182899212342,
        name: 'Guam',
        code: 'GU',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009261310006,
        country_id: 182899212342,
        name: 'Hawaii',
        code: 'HI',
        tax: 0.04,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.0,
      },
      {
        id: 2009261342774,
        country_id: 182899212342,
        name: 'Idaho',
        code: 'ID',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009261375542,
        country_id: 182899212342,
        name: 'Illinois',
        code: 'IL',
        tax: 0.0625,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.25,
      },
      {
        id: 2009261408310,
        country_id: 182899212342,
        name: 'Indiana',
        code: 'IN',
        tax: 0.07,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 7.0,
      },
      {
        id: 2009261441078,
        country_id: 182899212342,
        name: 'Iowa',
        code: 'IA',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009261473846,
        country_id: 182899212342,
        name: 'Kansas',
        code: 'KS',
        tax: 0.065,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.5,
      },
      {
        id: 2009261506614,
        country_id: 182899212342,
        name: 'Kentucky',
        code: 'KY',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009261539382,
        country_id: 182899212342,
        name: 'Louisiana',
        code: 'LA',
        tax: 0.04,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.0,
      },
      {
        id: 2009261572150,
        country_id: 182899212342,
        name: 'Maine',
        code: 'ME',
        tax: 0.055,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.5,
      },
      {
        id: 2009261604918,
        country_id: 182899212342,
        name: 'Marshall Islands',
        code: 'MH',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009261637686,
        country_id: 182899212342,
        name: 'Maryland',
        code: 'MD',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009261670454,
        country_id: 182899212342,
        name: 'Massachusetts',
        code: 'MA',
        tax: 0.0625,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.25,
      },
      {
        id: 2009261703222,
        country_id: 182899212342,
        name: 'Michigan',
        code: 'MI',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009261735990,
        country_id: 182899212342,
        name: 'Minnesota',
        code: 'MN',
        tax: 0.06875,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.875,
      },
      {
        id: 2009261768758,
        country_id: 182899212342,
        name: 'Mississippi',
        code: 'MS',
        tax: 0.07,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 7.0,
      },
      {
        id: 2009261801526,
        country_id: 182899212342,
        name: 'Missouri',
        code: 'MO',
        tax: 0.04225,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.225,
      },
      {
        id: 2009261834294,
        country_id: 182899212342,
        name: 'Montana',
        code: 'MT',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009261867062,
        country_id: 182899212342,
        name: 'Nebraska',
        code: 'NE',
        tax: 0.055,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.5,
      },
      {
        id: 2009261899830,
        country_id: 182899212342,
        name: 'Nevada',
        code: 'NV',
        tax: 0.0685,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.85,
      },
      {
        id: 2009261932598,
        country_id: 182899212342,
        name: 'New Hampshire',
        code: 'NH',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009261965366,
        country_id: 182899212342,
        name: 'New Jersey',
        code: 'NJ',
        tax: 0.07,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 7.0,
      },
      {
        id: 2009261998134,
        country_id: 182899212342,
        name: 'New Mexico',
        code: 'NM',
        tax: 0.05,
        tax_name: 'GRT',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.0,
      },
      {
        id: 2009262030902,
        country_id: 182899212342,
        name: 'New York',
        code: 'NY',
        tax: 0.04,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.0,
      },
      {
        id: 2009262063670,
        country_id: 182899212342,
        name: 'North Carolina',
        code: 'NC',
        tax: 0.0475,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.75,
      },
      {
        id: 2009262096438,
        country_id: 182899212342,
        name: 'North Dakota',
        code: 'ND',
        tax: 0.05,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.0,
      },
      {
        id: 2009262129206,
        country_id: 182899212342,
        name: 'Northern Mariana Islands',
        code: 'MP',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009262161974,
        country_id: 182899212342,
        name: 'Ohio',
        code: 'OH',
        tax: 0.0575,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.75,
      },
      {
        id: 2009262194742,
        country_id: 182899212342,
        name: 'Oklahoma',
        code: 'OK',
        tax: 0.045,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.5,
      },
      {
        id: 2009262227510,
        country_id: 182899212342,
        name: 'Oregon',
        code: 'OR',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009262260278,
        country_id: 182899212342,
        name: 'Palau',
        code: 'PW',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009262293046,
        country_id: 182899212342,
        name: 'Pennsylvania',
        code: 'PA',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009262325814,
        country_id: 182899212342,
        name: 'Puerto Rico',
        code: 'PR',
        tax: 0.105,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 10.5,
      },
      {
        id: 2009262358582,
        country_id: 182899212342,
        name: 'Rhode Island',
        code: 'RI',
        tax: 0.07,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 7.0,
      },
      {
        id: 2009262391350,
        country_id: 182899212342,
        name: 'South Carolina',
        code: 'SC',
        tax: 0.05,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.0,
      },
      {
        id: 2009262424118,
        country_id: 182899212342,
        name: 'South Dakota',
        code: 'SD',
        tax: 0.04,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.0,
      },
      {
        id: 2009262456886,
        country_id: 182899212342,
        name: 'Tennessee',
        code: 'TN',
        tax: 0.07,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 7.0,
      },
      {
        id: 2009262489654,
        country_id: 182899212342,
        name: 'Texas',
        code: 'TX',
        tax: 0.0625,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.25,
      },
      {
        id: 2009262522422,
        country_id: 182899212342,
        name: 'Utah',
        code: 'UT',
        tax: 0.047,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.7,
      },
      {
        id: 2009262555190,
        country_id: 182899212342,
        name: 'Vermont',
        code: 'VT',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009262751798,
        country_id: 182899212342,
        name: 'Virgin Islands',
        code: 'VI',
        tax: 0.0,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 0.0,
      },
      {
        id: 2009262587958,
        country_id: 182899212342,
        name: 'Virginia',
        code: 'VA',
        tax: 0.053,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.3,
      },
      {
        id: 2009262620726,
        country_id: 182899212342,
        name: 'Washington',
        code: 'WA',
        tax: 0.065,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.5,
      },
      {
        id: 2009262653494,
        country_id: 182899212342,
        name: 'West Virginia',
        code: 'WV',
        tax: 0.06,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 6.0,
      },
      {
        id: 2009262686262,
        country_id: 182899212342,
        name: 'Wisconsin',
        code: 'WI',
        tax: 0.05,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 5.0,
      },
      {
        id: 2009262719030,
        country_id: 182899212342,
        name: 'Wyoming',
        code: 'WY',
        tax: 0.04,
        tax_name: 'State Tax',
        tax_type: null,
        shipping_zone_id: 103252459574,
        tax_percentage: 4.0,
      },
    ],
  },
]

export default keyBy(shipping_zones, 'code')
