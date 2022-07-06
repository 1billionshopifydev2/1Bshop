const fragmentCollection = `
    id
    handle
    title
    description
    descriptionHtml
    seo {
      title
      description
    }
    groupCombo: metafield(namespace: "my_fields", key: "group_combo") {
      key
      value
      reference {
          ... on GenericFile {
            url
          }
        }
    }
`

module.exports = fragmentCollection