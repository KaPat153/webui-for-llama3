import logging
import os

from peewee_migrate import Router
from playhouse.db_url import connect

from config import DATA_DIR, DATABASE_URL, SRC_LOG_LEVELS

log = logging.getLogger(__name__)
log.setLevel(SRC_LOG_LEVELS["DB"])

# Check if the file exists
if os.path.exists(f"{DATA_DIR}/ollama.db"):
    # Rename the file
    os.rename(f"{DATA_DIR}/ollama.db", f"{DATA_DIR}/webui.db")
    log.info("Database migrated from Ollama-WebUI successfully.")
else:
    pass

DB = connect(DATABASE_URL)
log.info(f"Connected to a {DB.__class__.__name__} database.")
router = Router(DB, migrate_dir="apps/web/internal/migrations", logger=log)
router.run()
DB.connect(reuse_if_open=True)
