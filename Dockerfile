FROM php:8.3-fpm-alpine

# System dependencies
RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    zip unzip \
    git curl \
    oniguruma-dev \
    libxml2-dev \
    icu-dev \
    nodejs npm

# PHP extensions
RUN docker-php-ext-install \
    pdo_pgsql \
    mbstring \
    zip \
    exif \
    pcntl \
    bcmath \
    xml \
    intl

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Build frontend assets (Vite)
RUN npm install \
    && npm run build \
    && rm -rf node_modules

# Permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]