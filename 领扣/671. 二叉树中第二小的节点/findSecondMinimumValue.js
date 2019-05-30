/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。
 如果一个节点有两个子节点的话，那么这个节点的值不大于它的子节点的值。 
 给出这样的一个二叉树，你需要输出所有节点中的第二小的值。如果第二小的值不存在的话，输出 -1 。
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findSecondMinimumValue = function(root) {
    let min = root.val
    let smin = -1
    let nodeArr = []
    if(root.left)
        nodeArr.push(root.left)
    if(root.right)
        nodeArr.push(root.right)
    
    while(nodeArr.length > 0){
        let tempNodeArr = []
        for(let index in nodeArr){
            let node = nodeArr[index]
            if(node.val > min){
                if(smin < 0){
                    smin = node.val
                }else{
                    if(smin > node.val)
                        smin = node.val
                }
            }
            if(node.left)
            tempNodeArr.push(node.left)
            if(node.right)
            tempNodeArr.push(node.right)
        }
        nodeArr = tempNodeArr
    }
    return smin
};