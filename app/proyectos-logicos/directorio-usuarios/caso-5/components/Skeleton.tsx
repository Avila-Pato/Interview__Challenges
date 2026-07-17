
interface SkeletonProps {
  count: number
}

  export const  Skeleton =  ({ count = 3 }: SkeletonProps) =>  {
    return (
      <ul>
        {[...Array(count)].map((_, index) => (
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