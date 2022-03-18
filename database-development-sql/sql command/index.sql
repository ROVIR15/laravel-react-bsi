SELECT p.id, p.name, p.email, p.npwp, S.name, S.description, A.street, A.city, A.province, A.country 
from party as p
left join address as A on A.party_id = p.id 
inner join party_roles as pr on pr.party_id = p.id 
left join relationship as R on pr.relantionship_id = R.id 
left join status as S on R.status_id = S.id where S.name = "Buyer"

SELECT p.id, g.name as goods_name, g.satuan, g.value, pc.name as product_category 
FROM goods as g 
INNER JOIN product AS p ON g.id = p.goods_id 
inner join product_has_product_category as phpc on p.id = phpc.product_id 
INNER JOIN product_category as pc on phpc.product_category_id = pc.id

DB::table("goods as g")
->innerJoin("product as p", function($join){
	$join->on("g.id", "=", "p.goods_id");
})
->innerJoin("product_has_product_category as phpc", function($join){
	$join->on("p.id", "=", "phpc.product_id");
})
->innerJoin("product_category as pc", function($join){
	$join->on("phpc.product_category_id", "=", "pc.id");
})
->select("p.id", "g.name as goods_name", "g.satuan", "g.value", "pc.name as product_category")
->get();