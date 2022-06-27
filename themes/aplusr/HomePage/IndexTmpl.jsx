import React, { lazy } from 'react'

import HeroCTA from './HeroCTATmpl'
import EditButtons from '../EditButtons/EditButtons'

const ContentSections = lazy(() => import('src/components/ContentPages/ContentSections'))
const LatestNewsTmpl = lazy(() => import('./LatestNewsTmpl'))
const isSSR = typeof window === 'undefined'

const IndexTmpl = ({ mainData, blogData }) => {

  return (
    <>
      <HeroCTA hero={mainData.hero} />
      {
        !isSSR &&
        <React.Suspense fallback={<div />}>
          <ContentSections sections={mainData.top_sections} />
          <LatestNewsTmpl blogData={blogData} />
          <ContentSections sections={mainData.bottom_sections} />

          <EditButtons editStrapiUrl={`${process.env.STRAPI_URL}/admin/plugins/content-manager/singleType/application::main.main`} />
        </React.Suspense>
      }
    </>
  )
}

export default IndexTmpl