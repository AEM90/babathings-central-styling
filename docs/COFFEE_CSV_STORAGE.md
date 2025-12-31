# Coffee Grinder Logbook - CSV Storage Guide

## CSV Export/Import Features

The Coffee Grinder Logbook now supports CSV export and import for data backup and cross-device synchronization.

### Quick Start

1. **Export your data**: Click "📥 Export" button
2. **Save to cloud**: Upload the CSV to Google Drive, Dropbox, or iCloud
3. **Import on another device**: Download the CSV and click "📤 Import"

## CSV Format

### Exported Columns:
- Date (ISO timestamp)
- Coffee Name
- Roaster
- Method (Espresso, Pour Over, etc.)
- Grinder Type
- Grind Setting
- Weight (g)
- Water Ratio
- Temperature (°C)
- Roast Level
- Brew Time
- Rating (1-5)
- Flavor Notes (semicolon-separated)
- Notes
- Image URL (marked as "base64-image-data" but not exported)

### Example CSV Row:
```csv
2025-12-31T10:30:00.000Z,Ethiopian Yirgacheffe,Blue Bottle Coffee,Pour Over,Baratza Encore,15,18.5,15.5,93,Medium-Light,2:30,5,Fruity; Floral; Bright,Perfect cup with berry notes,
```

## Cloud Storage Options

### Option 1: Google Drive (Recommended)
**Best for**: Cross-platform sync, sharing with others

**Setup:**
1. Export CSV from app
2. Upload to Google Drive folder (e.g., "Coffee Logbook")
3. Enable sharing or keep private
4. On another device: Download CSV → Import to app

**Benefits:**
- 15GB free storage
- Access from any device
- Version history
- Can share with friends who also track coffee

### Option 2: Dropbox
**Best for**: Automatic sync

**Setup:**
1. Create "Coffee Logbook" folder in Dropbox
2. Export CSV and save to Dropbox folder
3. Use Dropbox app on mobile to access
4. Import on other devices

**Benefits:**
- Auto-sync across devices
- Easy mobile access
- 2GB free (or paid plans)

### Option 3: iCloud Drive
**Best for**: Apple ecosystem users

**Setup:**
1. Export CSV
2. Save to iCloud Drive folder
3. Access from iPhone/iPad via Files app
4. Import to app

**Benefits:**
- Seamless for Apple users
- 5GB free storage
- Works with Files app

### Option 4: GitHub (Advanced)
**Best for**: Tech-savvy users, version control

**Setup:**
1. Create private GitHub repo "coffee-logbook"
2. Export CSV
3. Commit and push CSV to repo
4. Clone/pull on other devices
5. Import CSV

**Benefits:**
- Full version history
- Free unlimited private repos
- Can track changes over time
- Git-powered backups

## Workflow Examples

### Daily Workflow
```
Morning brew → Log in app → Data saved to LocalStorage
Weekly → Export CSV → Upload to Google Drive (backup)
```

### Multi-Device Workflow
```
Home setup:
  Brew → Log on iPad → Export CSV → Upload to Dropbox

Office setup:
  Download CSV from Dropbox → Import to laptop browser → Continue logging

Evening:
  Export from laptop → Upload to Dropbox → Replaces old file
```

### Sharing with Coffee Community
```
Export CSV → Upload to Google Drive → Share link (view-only)
Friends can download your CSV to see your brew logs
They can import to their own app to compare settings
```

## Important Notes

### ⚠️ Limitations
- **Images are NOT exported** - CSV only contains text data
  - Images are stored as base64 in LocalStorage
  - Too large for practical CSV export
  - Consider using photo backup service separately

### 💡 Best Practices
- **Export regularly** - Weekly or monthly backups
- **Name files with dates** - `coffee-logbook-2025-12-31.csv`
- **Keep cloud folder organized** - Delete old exports
- **Import adds data** - Doesn't replace, so avoid duplicate imports

### 🔄 Sync Strategy
- **Single source of truth**: Pick one device as primary
- **Export after each session**: Create new CSV backup
- **Import only when switching devices**: Download latest CSV
- **Avoid circular imports**: Don't re-import your own exports

## Troubleshooting

### Import fails
- Check CSV has header row
- Ensure commas are properly escaped
- Verify date format is ISO (YYYY-MM-DDTHH:mm:ss.sssZ)

### Missing data after import
- Images won't be imported (take new photos)
- Check flavor notes use semicolons (;) not commas

### Duplicate entries
- Import adds to existing data
- Delete duplicates manually or clear LocalStorage before import

## Advanced: Automated Sync

For power users, you could:
1. Set up automated export script
2. Use cloud service API to auto-upload
3. Sync CSV file across devices
4. Auto-import on app load

This requires custom development but is possible with browser extensions or service workers.

## Future Enhancements

Potential upgrades:
- [ ] Cloud sync button (direct Google Drive integration)
- [ ] Automatic backup on each save
- [ ] Image export to separate folder
- [ ] JSON export (includes images as base64)
- [ ] API integration for real-time sync
