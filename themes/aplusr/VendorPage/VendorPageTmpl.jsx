import React, { Fragment } from 'react'
import '../assets/styles/ecommerce/vendor-table.scss'

const VendorPageTmpl = ({ groupCombos, matrix, uniqueGroups, handleChange, isLoading, hasMatchingGroupCombos }) => {
    if (isLoading) {
        return (
            <div id="vendor-table">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div id="vendor-table">
            <table>
                <thead>
                    {!hasMatchingGroupCombos && (
                        <tr>
                            <th colSpan={groupCombos.length + 1} className="table-danger">
                                WARNING! There aren't any matching Group Combos with the same groups as defined in product's options.
                            </th>
                        </tr>
                    )}
                    <tr>
                        <th></th>
                        {groupCombos.map(groupCombo => (
                            <th key={groupCombo.id}>
                                <button className="btn btn-primary pull-right" onClick={(event) => handleChange(event, groupCombo.shopify_collection_id)}>
                                    ASSIGN
                                </button>
                                {groupCombo.title} (#{ groupCombo.id })<br />
                                <small>
                                    {groupCombo.products_count} products
                                </small>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {uniqueGroups.map(uniqueGroup => (
                        <tr key={uniqueGroup}>
                            <th>{uniqueGroup}</th>
                            {groupCombos.map(groupCombo => {
                                if (matrix[uniqueGroup][groupCombo.id]) {
                                    let group = matrix[uniqueGroup][groupCombo.id]
                                    return (
                                        <td key={group.id}>
                                            {group.fabric.map(fabric => (
                                                <Fragment key={fabric.id}>
                                                    {fabric.display_name}<br />
                                                </Fragment>
                                            ))}
                                        </td>
                                    )
                                } else {
                                    return (<td></td>)
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default VendorPageTmpl