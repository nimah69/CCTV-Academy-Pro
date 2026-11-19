import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const fail = (message) => assert.fail(message);

// Topic sections and navigation entries must stay in sync.
const topicIds = [...html.matchAll(/<section\b[^>]*\bclass=["'][^"']*\btopic\b[^"']*["'][^>]*\bid=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
const navTopicIds = [...html.matchAll(/<a\b[^>]*\bhref=["']#(t\d+)["'][^>]*>/gi)].map(m => m[1]);
assert.equal(topicIds.length, 363, 'Expected 363 topic sections');
assert.equal(navTopicIds.length, topicIds.length, 'Every topic must have one navigation entry');
assert.deepEqual([...navTopicIds].sort(), [...topicIds].sort(), 'Navigation and topic section IDs must match');

// Every HTML id must be unique.
const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
assert.deepEqual([...new Set(duplicates)], [], 'Duplicate HTML IDs found');

// Every local hash link must point to an existing element.
const idSet = new Set(ids);
const hashes = [...html.matchAll(/\bhref=["']#([^"'\s]+)["']/gi)].map(m => m[1]);
const missing = [...new Set(hashes.filter(id => !idSet.has(id)))];
assert.deepEqual(missing, [], 'Broken internal hash links found');

// Skip link must target the main content and be handled without changing the topic hash.
assert.match(html, /<a\b[^>]*class=["']skip["'][^>]*href=["']#academy-content["']/i);
assert.match(html, /skipLink\.addEventListener\(['"]click['"],\s*function\(e\)\s*\{\s*e\.preventDefault\(\);\s*mainContent\.focus\(\);/);

// Each exercise must have four options and exactly one correct answer.
const exercises = [...html.matchAll(/<[^>]+class=["'][^"']*\bexercise\b[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/gi)].map(m => m[1]);
assert.ok(exercises.length > 0, 'No exercises found');
for (let i = 0; i < exercises.length; i++) {
  const options = [...exercises[i].matchAll(/class=["'][^"']*\bopt\b[^"']*["']/gi)].length;
  const correct = [...exercises[i].matchAll(/data-ok=["']1["']/gi)].length;
  assert.equal(options, 4, `Exercise ${i + 1} must have exactly four options`);
  assert.equal(correct, 1, `Exercise ${i + 1} must have exactly one correct option`);
}

assert.match(html, /id=["']academy-count["']/);
assert.match(html, /topicTotal=nav\.querySelectorAll\('a\[href\^="#t"\]'\)\.length/);
console.log(`Static audit passed: ${topicIds.length} topics, ${ids.length} unique IDs, ${hashes.length} local links, ${exercises.length} exercises.`);
