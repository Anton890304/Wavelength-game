const test=require('node:test');
const assert=require('node:assert/strict');
const rules=require('../rules.js');
test('Scoring boundaries are symmetric and inclusive',()=>{for(const direction of [-1,1]){for(const [distance,points] of [[0,4],[4,4],[5,3],[10,3],[11,2],[16,2],[17,0],[50,0]])assert.equal(rules.score(50,50+distance*direction),points);}});
test('Targets leave room for all scoring zones',()=>{assert.equal(rules.target(()=>0),16);assert.equal(rules.target(()=>.999999),84);for(let i=0;i<1000;i++){const target=rules.target();assert.ok(target>=16&&target<=84);assert.ok(Number.isInteger(target));}});
test('Deck contains sixty unique complete pairs',()=>{assert.equal(rules.pairs.length,60);assert.equal(new Set(rules.pairs.map(p=>p.join('|'))).size,60);assert.ok(rules.pairs.every(p=>p.length===2&&p.every(x=>typeof x==='string'&&x.length)));});
