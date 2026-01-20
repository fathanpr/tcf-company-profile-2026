#!/bin/bash
# Reset PostgreSQL user password
echo "nevergiveup" | sudo -S -u postgres psql -c "ALTER USER tcf_admin WITH PASSWORD 'tcf_secure_pass';"
# Grant public schema permissions
echo "nevergiveup" | sudo -S -u postgres psql -d tcf_company_profile -c "GRANT ALL ON SCHEMA public TO tcf_admin;"
# Run migrations
cd /var/www/tcf-company-profile
php artisan migrate --force
