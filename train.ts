/* =======================================================
   |                     TASK ZJ                         |
   =======================================================

Shart:
Shunday function yozing, u berilgan array ichidagi
raqamlarni qiymatini hisoblab qaytarsin.

MASALAN: reduceNestedArray([1, [1, 2, [4]]]); return 8;

Yuqoridagi misolda, array nested bo'lgan holdatda ham,
bizning function ularning yig'indisini hisoblab qaytarmoqda. */

function reduceNestedArray(arr: any[]): number {
  return arr.reduce((sum: number, item: any): number => {
    if (Array.isArray(item)) {
      return sum + reduceNestedArray(item);
    }
    return sum + item;
  }, 0);
}

console.log("RESULT:")
console.log(reduceNestedArray([1, [1, 2, [4]]])); // 8