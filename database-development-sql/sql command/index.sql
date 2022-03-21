SELECT p.id, p.name, p.email, p.npwp, S.name, S.description, A.street, A.city, A.province, A.country 
from party as p
left join address as A on A.party_id = p.id 
inner join party_roles as pr on pr.party_id = p.id 
left join relationship as R on pr.relantionship_id = R.id 
left join status as S on R.status_id = S.id where S.name = "Buyer"

// Goods
select pf.id, pf.product_id as product_id, g.name, pf.size, pf.color
from product as p 
RIGHT join product_feature as pf on pf.product_id= p.id
left join goods as g on g.id = p.id
left join product_has_category as phc on phc.product_id = p.id
left join product_category as pc on phc.product_category_id = pc.id

SELECT * FROM (
	SELECT p.id, g.name as goods_name, g.satuan, g.value, pc.name as product_category 
	FROM goods as g 
	INNER JOIN product AS p ON g.id = p.goods_id 
	INNER JOIN product_has_category as phpc on p.id = phpc.product_id 
	INNER JOIN product_category as pc on phpc.product_category_id = pc.id
) as new_table INNER JOIN product_feature as pf ON new_table.id = pf.product_id

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