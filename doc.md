Range = 2

currentPage = 1
pageSize = 20

[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20 5  
1 2 [3] 4 5 ... 19 20 6
1 2 3 [4] 5 6 ... 19 20 7
1 2 3 4 [5] 6 7 ... 19 20 8

Array(pageSize).fill(0).map((\_, index) => {
const pageNumber = index + 1;
if(currentPage <= Range \* 2 + 1 && pageNuber > page + Range && pageNumber < pageSize - Range + 1 )
return <div>pageNumber</div>
})

1 2 ... 4 5 [6] 7 8 ... 19 20
1 2 ... 13 14 [15] 16 17 ... 19 20

pageNumber : ko duoc la so 1 va 2 pageNumber > Range + 1 // neu la 1 va 2 -> out
pageNumber : ko duoc la so 19 va 20 pageNumber <= pageSize - Range + 1 // neu la 19 va 20 -> out

dk de show ra ...
pageNumber : abs(currentPage - pageNumber) <= range

if(pageNumber < Range + 1 && pageNumber )

1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
