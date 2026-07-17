  export const  Skeleton =  () =>  {
    return (
      <ul>
        {[...Array(3)].map((_, index) => (
          <li key={index}>
            <div>
              <strong className="h-2 w-1/3 bg-red-900 animate-pulse"></strong>
              <span className="h-2 w-1/3 bg-red-900 animate-pulse"></span>
            </div>
          </li>
        ))}
      </ul>
    )
  }