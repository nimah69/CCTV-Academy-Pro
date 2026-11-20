import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

// Topic sections and sidebar navigation must stay in sync.
const topicIds = [...html.matchAll(/<section\b[^>]*\bclass=["']topic["'][^>]*\bid=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
const navMarkup = html.match(/<nav\b[^>]*\bid=["']sb-nav["'][^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? '';
const navTopicIds = [...navMarkup.matchAll(/<a\b[^>]*\bhref=["']#(t\d+)["'][^>]*>/gi)].map(m => m[1]);
assert.equal(topicIds.length, 364, 'Expected 364 topic sections including practical chapter 24');
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

// Each exercise block must contain four options and exactly one correct answer.
const exercises = [...html.matchAll(/<div\b[^>]*class=["']exercise["'][^>]*>[\s\S]*?(?=<div\b[^>]*class=["']exercise["']|<\/section>)/gi)].map(m => m[0]);
assert.ok(exercises.length > 0, 'No exercises found');
for (let i = 0; i < exercises.length; i++) {
  const options = [...exercises[i].matchAll(/class=["'][^"']*\bopt\b[^"']*["']/gi)].length;
  const correct = [...exercises[i].matchAll(/data-ok=["']1["']/gi)].length;
  assert.equal(options, 4, `Exercise ${i + 1} must have four options`);
  assert.equal(correct, 1, `Exercise ${i + 1} must have one correct answer`);
}

assert.match(html, /id=["']academy-count["']/);
assert.match(html, /topicTotal=nav\.querySelectorAll\('a\[href\^="#t"\]'\)\.length/);
assert.ok(html.includes('id="t364"'), 'Practical chapter 24 must exist');
assert.ok(html.includes('id="practice-list"'), 'Practical quiz container must exist');
assert.ok(html.includes('cctvAcademyPractice.v1'), 'Separate practice progress key must exist');
const practiceIds = [...html.matchAll(/id:'(p364-[a-z0-9-]+)'/g)].map(m => m[1]);
assert.equal(practiceIds.length, 89, 'Expected 89 practical exercises across the first 280 topics');
assert.equal(new Set(practiceIds).size, practiceIds.length, 'Practical exercise IDs must be unique');
console.log(`Static audit passed: ${topicIds.length} topics, ${ids.length} HTML IDs, ${hashes.length} local links, ${exercises.length} exercises.`);
