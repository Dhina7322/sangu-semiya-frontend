const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // text-[Xpx] -> text-[ (X+2)px ]
    content = content.replace(/text-\[(\d+)px\]/g, (match, p1) => {
        changed = true;
        return `text-[${parseInt(p1) + 2}px]`;
    });

    // Also handle text-xs, text-sm, text-base, text-lg ONLY if not on a heading element
    // This is hard to do with regex on raw strings, so I'll just stick to text-[Xpx] and maybe text-sm/base for now.
    // Actually, I'll replace text-base with text-[18px] and text-sm with text-[16px] to be safe.
    
    // Let's check text-sm and text-base as well.
    // But I must be careful not to touch headings.
    // Most headings in this project use text-xl and above or specifically text-[...px] which I just bumped.
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
