import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function EachBlog() {
    const [params] = useSearchParams()
    const blogid = params.get("blogid")
    console.log(blogid)


  return (
    <div>
        hi there
      
    </div>
  )
}
