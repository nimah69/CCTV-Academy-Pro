import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

// Keep topic sections and sidebar navigation synchronized.
const topicIds = [...html.matchAll(/<section\b[^>]*\bclass=["']topic["'][^>]*\bid=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
const navMarkup = html.match(/<nav\b[^>]*\bid=["']sb-nav["'][^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? '';
const navTopicIds = [...navMarkup.matchAll(/<a\b[^>]*\bhref=["']#(t\d+)["'][^>]*>/gi)].map(m => m[1]);
assert.equal(topicIds.length, 379, 'Expected 379 educational topics');
assert.equal(navTopicIds.length, topicIds.length, 'Every topic must have one sidebar entry');
assert.deepEqual([...navTopicIds].sort(), [...topicIds].sort(), 'Sidebar and topic IDs must match');

// Ignore script text when checking actual HTML IDs.
const markupWithoutScripts = html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
const ids = [...markupWithoutScripts.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
assert.deepEqual([...new Set(duplicates)], [], 'Duplicate HTML IDs found');

// Every local hash link must point to an existing HTML element.
const idSet = new Set(ids);
const hashes = [...markupWithoutScripts.matchAll(/\bhref=["']#([^"'\s]+)["']/gi)].map(m => m[1]);
const missing = [...new Set(hashes.filter(id => !idSet.has(id)))];
assert.deepEqual(missing, [], 'Broken internal hash links found');

// The skip link must focus main content without routing it through showTopic().
assert.match(html, /<a\b[^>]*class=["']skip["'][^>]*href=["']#academy-content["']/i);
assert.match(html, /skipLink\.addEventListener\(['"]click['"],\s*function\(e\)\s*\{\s*e\.preventDefault\(\);\s*mainContent\.focus\(\);/);

// Each embedded exercise block must contain four options and one correct answer.
const exercises = [...html.matchAll(/<div\b[^>]*class=["'][^"']*\bexercise\b[^"']*["'][^>]*>[\s\S]*?(?=<div\b[^"']*class=["'][^"']*\bexercise\b[^"']*["']|<\/section>)/gi)].map(m => m[0]);
assert.ok(exercises.length > 0, 'No exercises found');
for (let i = 0; i < exercises.length; i++) {
  const options = [...exercises[i].matchAll(/class=["'][^"']*\bopt\b[^"']*["']/gi)].length;
  const correct = [...exercises[i].matchAll(/data-ok=["']1["']/gi)].length;
  assert.equal(options, 4, `Exercise ${i + 1} must have four options`);
  assert.equal(correct, 1, `Exercise ${i + 1} must have one correct answer`);
}

assert.match(html, /id=["']academy-count["']/);
assert.match(html, /topicTotal=nav\.querySelectorAll\('a\[href\^="#t"\]'\)\.length/);
assert.ok(html.includes('id="t379"'), 'Latest topic must exist');
assert.ok(html.includes('id="pq-list"'), 'Practical quiz container must exist');
assert.ok(html.includes('cctvAcademyPractice.v1'), 'Practical progress key must exist');

// Validate the current structured practical quiz data, rather than obsolete p364 IDs.
const dataStart = html.indexOf('var DT=');
const dataEnd = html.indexOf('}},K=', dataStart);
assert.ok(dataStart >= 0 && dataEnd > dataStart, 'Structured practical data must be present');
const practicalData = JSON.parse(html.slice(dataStart + 7, dataEnd + 2));
assert.equal(practicalData.items.length, 35, 'Expected 35 structured practical tasks');
const practicalIds = practicalData.items.map(item => item.id);
assert.equal(new Set(practicalIds).size, practicalIds.length, 'Practical task IDs must be unique');
for (const item of practicalData.items) {
  assert.ok(item.id && item.q && item.w && item.x, 'Each practical task needs an ID, question and feedback');
  if (item.y === 'single') {
    assert.equal(item.o.length, 4, `${item.id} must have four options`);
    assert.ok(Number.isInteger(item.a) && item.a >= 0 && item.a < item.o.length, `${item.id} has an invalid answer index`);
  } else if (item.y === 'multi') {
    assert.equal(item.o.length, 5, `${item.id} must have five options`);
    assert.ok(Array.isArray(item.a) && item.a.length > 0 && item.a.every(a => Number.isInteger(a) && a >= 0 && a < item.o.length), `${item.id} has invalid multi-select answers`);
  } else if (item.y === 'numeric') {
    assert.equal(typeof item.a, 'number', `${item.id} must have a numeric answer`);
  } else if (item.y === 'order') {
    assert.equal(item.o.length, 5, `${item.id} must have five ordering items`);
    assert.ok(Array.isArray(item.a) && item.a.length === item.o.length, `${item.id} has an invalid ordering answer`);
  } else {
    assert.fail(`${item.id} has an unsupported task type: ${item.y}`);
  }
}

// The field-secrets first revision must contain exactly 100 additional list items.
const fieldTipsBlock = html.match(/<div class=["']field-100-tips["']>([\s\S]*?)<\/div>\s*<h3[^>]*>منابع بررسی‌شده/i)?.[1] ?? '';
const fieldTipCount = [...fieldTipsBlock.matchAll(/<li(?:\s[^>]*)?>/g)].length;
assert.equal(fieldTipCount, 100, 'Field-secrets revision must contain exactly 100 tips');

console.log(`Static audit passed: ${topicIds.length} topics, ${ids.length} HTML IDs, ${hashes.length} local links, ${exercises.length} exercises, ${practicalData.items.length} practical tasks, ${fieldTipCount} field tips.`);
